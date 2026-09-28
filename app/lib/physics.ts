/**
 * ══════════════════════════════════════════════════════════════
 *  Beyblade X — Physics Engine (โมดูลฟิสิกส์)
 *  ภาษา: TypeScript  |  หน่วยมาตรฐาน SI (kg, m, s, J, N, N·m)
 * ══════════════════════════════════════════════════════════════
 *
 *  สูตรหลักที่ใช้ในโมดูลนี้
 *  ─────────────────────────────────────────────────────────────
 *
 *  1) ความเร็วเชิงมุม (Angular Velocity)
 *     ω = 2π × RPM / 60          หน่วย: rad/s
 *     ω คือความเร็วในการหมุน — ยิ่งสูงยิ่งเสถียรและชนแรง
 *
 *  2) โมเมนต์ความเฉื่อย (Moment of Inertia)
 *     I = ½ × m × r² × k         หน่วย: kg·m²
 *     สมการทรงกระบอกกลวง (hollow disk) ×ปัจจัยเฉื่อย k ของเบลด
 *     k ขึ้นกับซีรีส์: BX≈1.0, UX≈1.1–1.25, CX≈1.2–1.3
 *
 *  3) โมเมนตัมเชิงมุม (Angular Momentum)  ← หัวใจหลัก
 *     L = I × ω                   หน่วย: kg·m²/s
 *     L คือ "แรงต้านการเปลี่ยนแปลงการหมุน" — L สูง = เบย์หมุนนานและต้านแรงชนได้ดี
 *
 *  4) พลังงานจลน์การหมุน (Rotational Kinetic Energy)
 *     E_rot = ½ × I × ω²         หน่วย: J
 *
 *  5) พลังงานจลน์เชิงเส้น (Linear Kinetic Energy)
 *     E_lin = ½ × m × v²         หน่วย: J
 *
 *  6) พลังงานจลน์รวม (Total Kinetic Energy)
 *     E_total = E_rot + E_lin     หน่วย: J
 *
 *  7) แรงกระแทก (Impact Force) จาก Impulse-Momentum Theorem
 *     J = Δp = m × Δv             หน่วย: N·s  (Impulse)
 *     F = J / Δt                  หน่วย: N    (Force)
 *     สำหรับ Beyblade X ประมาณ Δt ≈ 0.01 s (contact duration ~10 ms)
 *     ดังนั้น F_impact = (m × v × sin θ × ω/100) / Δt_contact
 *     → ใช้รูปแบบรวม: F = m·v·sin(θ)·(ω/100) / CONTACT_TIME
 *
 *  8) ทอร์กที่หยุดสปิน (Spin-down Torque)
 *     τ_friction = μ × m × g × r  หน่วย: N·m
 *     μ_bit = ค่าแรงเสียดทานจากประเภท Bit (Attack > Balance > Stamina/Defense)
 *
 *  9) เวลาหมุนโดยประมาณ (Estimated Spin Time)
 *     t_spin = L / τ_friction      หน่วย: s
 *
 *  10) ความเสี่ยง Burst
 *     Risk = (sides × 1.1) − (bitBurstResist × 0.8)
 *     แฉกน้อย = ล็อคแน่น; bitBurstResist สูง = ทนกว่า
 * ══════════════════════════════════════════════════════════════
 */

// ── ค่าคงที่ฟิสิกส์ ──────────────────────────────────────────────────────────

/** รัศมีอ้างอิงเฉลี่ยเบย์ X (m) */
export const EFFECTIVE_RADIUS_M = 0.024;

/** ความเร่งเนื่องจากแรงโน้มถ่วง (m/s²) */
export const GRAVITY = 9.81;

/** ระยะเวลาสัมผัสในการชน ~10 ms (s) */
export const CONTACT_TIME_S = 0.01;

/**
 * ค่าสัมประสิทธิ์แรงเสียดทาน μ แยกตามประเภท Bit
 * Attack วิ่งเร็ว → เสียดทานสูง → สปินหมดไว
 * Stamina/Defense → เสียดทานต่ำ → สปินนาน
 */
export const MU_BY_TYPE: Record<string, number> = {
    Attack:  0.18,
    Balance: 0.12,
    Defense: 0.08,
    Stamina: 0.05,
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type RpmBand = 'low' | 'optimal' | 'extreme';
export type BurstRisk = 'low' | 'moderate' | 'high';

export interface PhysicsInput {
    /** น้ำหนักรวมทั้งลูก (g) */
    totalWeightG: number;
    /** ค่าปัจจัยเฉื่อยจาก Blade (1.0 = BX baseline) */
    inertiaFactor: number;
    /** ความเร็วรอบชู๊ต (RPM) */
    rpm: number;
    /** ความเร็วเคลื่อนที่เชิงเส้น (m/s) */
    linearSpeedMs: number;
    /** มุมปะทะ (องศา) */
    angleDeg: number;
    /** จำนวนแฉก Ratchet */
    ratchetSides: number;
    /** ค่าต้านทาน Burst ของ Bit (1–5) */
    bitBurstResist: number;
    /** ประเภท Bit เพื่อคำนวณ μ (friction) */
    bitType: 'Attack' | 'Defense' | 'Stamina' | 'Balance';
}

export interface PhysicsOutput {
    // ── ค่าดิบ ──────────────────────────────────────────────
    /** ความเร็วเชิงมุม ω (rad/s) */
    omega: number;
    /** โมเมนต์ความเฉื่อย I (kg·m²) */
    momentOfInertia: number;
    /** โมเมนตัมเชิงมุม L (kg·m²/s) */
    angularMomentum: number;
    /** พลังงานจลน์การหมุน E_rot (J) */
    rotationalKE: number;
    /** พลังงานจลน์เชิงเส้น E_lin (J) */
    linearKE: number;
    /** พลังงานจลน์รวม E_total (J) */
    totalKE: number;
    /** แรงกระแทกประสิทธิผล F_impact (N) */
    impactForce: number;
    /** ทอร์กแรงเสียดทาน τ (N·m) */
    spinDownTorque: number;
    /** เวลาหมุนโดยประมาณ t_spin (s) */
    estimatedSpinTime: number;

    // ── ผลการวิเคราะห์ ───────────────────────────────────────
    /** ช่วง RPM */
    rpmBand: RpmBand;
    /** คะแนนความเสี่ยง Burst */
    burstRiskScore: number;
    /** ระดับความเสี่ยง Burst */
    burstRiskLevel: BurstRisk;
    /** ประเภทการเคลื่อนที่ */
    trajectoryType: string;
    /** คำอธิบายการเคลื่อนที่ */
    trajectoryDesc: string;
    /** คำอธิบาย RPM Band ภาษาไทย */
    rpmBandLabel: string;
    rpmBandDesc: string;
}

// ── ฟังก์ชันหลัก ─────────────────────────────────────────────────────────────

/**
 * คำนวณค่าฟิสิกส์ทั้งหมดสำหรับคอมโบ Beyblade X
 *
 * @example
 * const result = calcPhysics({
 *   totalWeightG: 46.0, inertiaFactor: 1.1,
 *   rpm: 5500, linearSpeedMs: 3.5, angleDeg: 45,
 *   ratchetSides: 3, bitBurstResist: 2, bitType: 'Attack'
 * });
 */
export function calcPhysics(input: PhysicsInput): PhysicsOutput {
    const {
        totalWeightG, inertiaFactor, rpm, linearSpeedMs,
        angleDeg, ratchetSides, bitBurstResist, bitType,
    } = input;

    const massKg = totalWeightG / 1000;
    const r = EFFECTIVE_RADIUS_M;

    // ── 1. ω = 2π × RPM / 60 ─────────────────────────────────────────────────
    const omega = (rpm * 2 * Math.PI) / 60;

    // ── 2. I = ½·m·r²·k ──────────────────────────────────────────────────────
    const momentOfInertia = 0.5 * massKg * r * r * inertiaFactor;

    // ── 3. L = I·ω  (Angular Momentum) ───────────────────────────────────────
    const angularMomentum = momentOfInertia * omega;

    // ── 4. E_rot = ½·I·ω² ────────────────────────────────────────────────────
    const rotationalKE = 0.5 * momentOfInertia * omega * omega;

    // ── 5. E_lin = ½·m·v² ────────────────────────────────────────────────────
    const linearKE = 0.5 * massKg * linearSpeedMs * linearSpeedMs;

    // ── 6. E_total ────────────────────────────────────────────────────────────
    const totalKE = rotationalKE + linearKE;

    // ── 7. F_impact = m·v·sin(θ)·(ω/100) / Δt ───────────────────────────────
    //    (Impulse–Momentum สำหรับ rotational + linear combined)
    const angleRad = (angleDeg * Math.PI) / 180;
    const impulse = massKg * linearSpeedMs * Math.sin(angleRad) + (angularMomentum * Math.sin(angleRad)) / 10;
    const impactForce = impulse / CONTACT_TIME_S;

    // ── 8. τ_friction = μ·m·g·r  (Spin-down Torque) ─────────────────────────
    const mu = MU_BY_TYPE[bitType] ?? 0.10;
    const spinDownTorque = mu * massKg * GRAVITY * r;

    // ── 9. t_spin = L / τ  (Estimated Spin Time) ─────────────────────────────
    const estimatedSpinTime = angularMomentum / spinDownTorque;

    // ── 10. RPM Band ──────────────────────────────────────────────────────────
    let rpmBand: RpmBand;
    let rpmBandLabel: string;
    let rpmBandDesc: string;

    if (rpm < 4000) {
        rpmBand = 'low';
        rpmBandLabel = 'ต่ำกว่า 4,000 RPM (Low Speed)';
        rpmBandDesc = 'แรงเหวี่ยงไจโรสโคปิก (Gyroscopic Stability) ต่ำเกินไป เบย์จะแกว่งตัวง่ายและสูญเสียสมดุลเมื่อถูกปะทะ — ขาดพลังงานหมุนสำรอง';
    } else if (rpm <= 6500) {
        rpmBand = 'optimal';
        rpmBandLabel = '4,000–6,500 RPM (Optimal Speed)';
        rpmBandDesc = 'ช่วง RPM ที่เหมาะสมที่สุด สมดุลระหว่างพลังงานหมุน (L สูง) และแรงเสียดทานที่ยอมรับได้ — ควบคุมทิศทางง่าย สปินนาน';
    } else {
        rpmBand = 'extreme';
        rpmBandLabel = 'สูงกว่า 6,500 RPM (Extreme RPM)';
        rpmBandDesc = 'พลังงานจลน์จากการหมุนสูงมาก แต่แรงเสียดทานความร้อนสูงที่ปลาย Bit — สร้างแรงกระแทกมหาศาล แต่สปินหมดไวและเสี่ยง Over Finish';
    }

    // ── 11. Burst Risk ────────────────────────────────────────────────────────
    let burstRiskScore = ratchetSides * 1.1 - bitBurstResist * 0.8;
    if (totalWeightG > 65) burstRiskScore -= 0.5;
    burstRiskScore = Math.max(0, burstRiskScore);

    let burstRiskLevel: BurstRisk;
    if (burstRiskScore <= 3.0) burstRiskLevel = 'low';
    else if (burstRiskScore <= 6.0) burstRiskLevel = 'moderate';
    else burstRiskLevel = 'high';

    // ── 12. Trajectory ────────────────────────────────────────────────────────
    let trajectoryType: string;
    let trajectoryDesc: string;

    if (bitType === 'Attack') {
        trajectoryType = 'พุ่งเฉียงรุนแรง / X-Dash Aggressive';
        trajectoryDesc = 'วิ่งปะทะวงนอก ไต่รางเร่งความเร็ว (X-Celerator) สร้างแรงกระแทกสูงสุด';
    } else if (bitType === 'Stamina') {
        trajectoryType = 'วนศูนย์กลาง / Center Circle';
        trajectoryDesc = 'รักษารัศมีวงแคบ ลดการสูญเสีย Angular Momentum จากแรงเสียดทาน — สปินนานที่สุด';
    } else if (bitType === 'Defense') {
        trajectoryType = 'ปักหลักนิ่ง / Counter Defensive';
        trajectoryDesc = 'ดูดซับแรงปะทะ (ลด Δp) ต้านแรงเหวี่ยงจากคู่แข่ง — L รักษาได้ดีมาก';
    } else {
        trajectoryType = 'บาลานซ์ปรับตัว / Adaptive Pattern';
        trajectoryDesc = 'ปรับเปลี่ยนรูปแบบการเคลื่อนที่ตามสถานการณ์การชน — ยืดหยุ่นทุกแมตช์';
    }

    return {
        omega, momentOfInertia, angularMomentum,
        rotationalKE, linearKE, totalKE,
        impactForce, spinDownTorque, estimatedSpinTime,
        rpmBand, rpmBandLabel, rpmBandDesc,
        burstRiskScore, burstRiskLevel,
        trajectoryType, trajectoryDesc,
    };
}

/** จัดรูปแบบตัวเลขพร้อมหน่วย */
export function fmt(value: number, decimals = 2): string {
    return value.toFixed(decimals);
}
