---
title: General Physics II Review
mathjax: true
tags: [note, physics]
date: 2020-08-25
permalink: physics/
---

<!-- cSpell:words Biot Savart Lenz Poynting -->

## Ch. 21 Coulomb's Law

### Charge

- **Plastic** rod rubbed on **fur**: **negatively** charged
- **Glass** rod rubbed on **silk**: **positively** charged

The total (net) electric charge of an isolated system is conserved.

- Charging by induction (without losing its own charge)

$$
e=1.60\times10^{-19}\rm C
$$

- Quantized Charge
- Millikin Oil-Drop Experiment

### Coulomb's Law

$$
F=k\frac{|q_1q_2|}{r^2}
$$

$$
k= \frac{1}{4\pi\epsilon_0} =
8.99\times10^9 \rm N\cdot m^2/C^2
$$

$$
\epsilon_0 =
8.85\times10^{-12}\rm C^2/N\cdot m^2
$$

- $k$ is the **electromagnetic constant**
- $\epsilon_0$ is the **permittivity constant**
- Principle of Superposition

<!-- more -->

## Ch. 22 Electric Field

### Definition

$$
\vec{F} = q\vec{E}.
$$

$$
\vec{E} =
\frac{\vec{F}}{q_0} =
k\frac{|q|}{r^2} =
\frac{1}{4\pi\epsilon_0}\frac{|q|}{r^2}
$$

### Cases

> The key to integrate, is find the relation between $\mathop{dq}$ and charge
> density (as well as length or area)

#### Uniformly Charged Line

![Uniformly Charged Line](https://gitee.com/sghuang19/assets/raw/master/img/20200815115549-Uniformly-Charged-Line.png)

$$
E_x =
\frac{1}{4\pi\epsilon_0}\frac{Q}{2a}
\int_{-a}^{+a}
\frac{x\mathop{dy}}{(x^2+y^2)^{3/2}} =
\frac{Q}{4\pi\epsilon_0}
\frac{1}{x\sqrt{x^2+a^2}}
$$

If the line is very long, $a\gg x$

$$
E = \frac{\lambda}{2\pi\epsilon_0 r}
$$

#### Uniformly Charged Ring

![Uniformly Charged Ring](https://gitee.com/sghuang19/assets/raw/master/img/20200815121851-Uniformly-Charged-Ring.png)

$$
\begin{aligned}
E & = \int\mathop{dE}\cos\theta \\ & =
\frac{z}{\sqrt{z^2+R^2}}\cdot
\frac{\lambda}{4\pi\epsilon_0 (z^2+R^2)}
\int_0^{2\pi R}\mathop{ds} \\ & =
\frac{qz}{4\pi\epsilon_0 (z^2+R^2)^{3/2}}.
\end{aligned}
$$

If the charged ring is at large distance, $z\gg R$

$$
E = \frac{1}{4\pi\epsilon_0}\frac{1}{z^2}.
$$

#### Uniformly Charged Disk

![Uniformly Charged Disk](https://gitee.com/sghuang19/assets/raw/master/img/20200815142044-Uniformly-Charged-Disk.png)

$$
\mathop{dq} =
\sigma\mathop{dA} =
\sigma(2\pi r\mathop{dr}).
$$

$$
\mathop{dE} =
\frac{\sigma z}{4\epsilon_0}
\frac{2r\mathop{dr}}{(z^2+r^2)^{3/2}}.
$$

$$
E = \int\mathop{dE} =
\frac{\sigma}{2\epsilon_0}\left(
1 - \frac{z}{\sqrt{z^2+R^2}}
\right).
$$

For $R\rightarrow\infty$ (infinite sheet)

$$
E = \frac{\sigma}{2\epsilon_0}.
$$

### Electric Field Line

### Electric Dipole \*

#### Electric Field Due to Electric Dipole

![Electric Dipole](https://gitee.com/sghuang19/assets/raw/master/img/20200816084952-Electric-Dipole.png)

$$
\begin{aligned}
E & =
E_{(+)} - E_{(-)} \\ & =
\frac{1}{4\pi\epsilon_0}
\frac{q}{r^2_{(+)}} -
\frac{1}{4\pi\epsilon_0}
\frac{q}{r^2_{(-)}} \\ & = \cdots \\ & =
\frac{q}{2\pi\epsilon_0z^3}
\frac{d}{\left(
1 - \left(\frac{d}{2z}\right)^2
\right)^2}
\end{aligned}.
$$

If $z\gg d$

$$
E = \frac{1}{2\pi\epsilon_0}\frac{qd}{z^3}
$$

- $qd$ is the **electric dipole moment** $\vec{p}$

On the axis of the dipole

$$
\vec{E}_\text{dipole} \approx
\frac{1}{4\pi\epsilon_0}\frac{\vec{p}}{r^3}
$$

On the perpendicular plane

$$
\vec{E}_\text{dipole} \approx
-\frac{1}{4\pi\epsilon_0}\frac{\vec{p}}{r^3}
$$

#### Dipole in Electric Field

![Torque on Dipole](https://gitee.com/sghuang19/assets/raw/master/img/20200816103540-Torque-on-Dipole.png)

$$
\vec{\tau} = Fd\sin\theta = \vec{p}\times\vec{E}.
$$

$$
U =
-W =
-\int\tau\mathop{d\theta} =
\int pE\sin\theta\mathop{d\theta} =
-pE\cos\theta =
-\vec{p}\cdot\vec{E}
$$

---

## Ch. 23 Gauss's Law

$$
\epsilon_0\Phi =
\epsilon_0\oint
\vec{E}\cdot\mathop{d\vec{A}} =
q_{\text{enclosed}}
$$

$$
\oint_A \vec{E}\cdot\mathop{d\vec{A}} =
\int_V \nabla\cdot\vec{E}\mathop{dV} =
\frac{q_{\text{enc}}}{\epsilon_0}.
$$

- Gauss's Law is equivalent with Coulomb's Law.
- Planar Symmetry
- Cylindrical Symmetry

### Charged Isolated Conductor

- There can be no excess charge at any point within a solid conductor
- Electric field inside a conductor needs to be zero
- Charge on the inner wall cannot produce and electric field in the shell to
  affect the charge on the outer wall

### Electrostatic Shielding

---

## Ch. 24 Electric Potential

$$
\Delta U = U_f - U_i = -W_{\text{by the field}}
$$

$$
V = V_f - V_i =
-\int_i^f \vec{E}\cdot\mathop{d\vec{s}}.
$$

$i$ is at $\infty$, where $U$ is $0$, $V_i$ is $0$.

- Electric potential for a point charge

$$
V = \frac{1}{4\pi\epsilon_0}\frac{q}{r}
$$

- Potential due to electric dipole

![Potential Due to Electric Dipole](https://gitee.com/sghuang19/assets/raw/master/img/20200816150116-Potential-Due-to-Electric-Dipole.png)

$$
V = V_{(+)} + V_{(-)} = \cdots =
\frac{1}{4\pi\epsilon_0}\frac{p\cos\theta}{r^2}
$$

- Field from Potential

$$
E_s = -\frac{\partial V}{\partial s}.
$$

$$
\vec{E} = -\nabla V
$$

---

## Ch. 25 Capacitance

$$
q = CV
$$

- Parallel capacitor

$$
C =
\frac{q}{V} =
\frac{\epsilon_0 EA}{Ed} =
\frac{\epsilon_0 A}{d}.
$$

- Cylindrical capacitor

![Cylindrical Capacitor](https://gitee.com/sghuang19/assets/raw/master/img/20200817233724-Cylindrical-Capacitor.png)

$$
q = \epsilon_0 EA = \epsilon_0 E(2\pi rL)
$$

$$
V =
\int_-^+ E\mathop{ds} =
-\frac{q}{2\pi\epsilon_0 L}
\int_b^a \frac{\mathop{dr}}{r} =
\frac{q}{2\pi\epsilon_0 L}
\ln\left(\frac{b}{a}\right)
$$

$$
C = \frac{q}{V} =
2\pi\epsilon_0 \frac{L}{\ln(b/a)}
$$

- Spherical capacitor

$$
\cdots C = 4\pi\epsilon_0 \frac{ab}{b-a}.
$$

- Series & Parallel

- Energy stored

$$
\mathop{dW} = v\mathop{dq} = \frac{q\mathop{dq}}{C}
$$

$$
W = \int_0^W \mathop{dW} =
\frac{1}{C}\int_0^Q q\mathop{dq} =
\frac{Q^2}{2C} \Rightarrow
U = \frac{1}{2}CV^2 = \frac{1}{2}QV
$$

- Energy density

$$
u = \frac{\frac{1}{2}CV^2}{Ad} = \frac{1}{2}\epsilon_0E^2
$$

- Dielectric

![Dielectric](https://gitee.com/sghuang19/assets/raw/master/img/20200817235159-dielectric.png)

$$
\epsilon =  \kappa\epsilon_0
$$

$$
E
= \frac{V}{d}
= \frac{q}{Cd}
= \frac{q}{d\epsilon_0A/d}
= \frac{\sigma}{\epsilon_0}
$$

$$
E = \frac{\sigma-\sigma_i}{\epsilon_0} = \frac{E_0}{K} \Rightarrow
\sigma_i = \sigma\left(1-\frac{1}{K}\right)
\quad\text{(induced surface charge density)}
$$

$$
\epsilon_0 \oint\kappa\vec{E}\cdot\mathop{d\vec{A}} = q
$$

---

## Ch. 26 Current and Resistance

### Current

$$
i = \frac{\mathop{dq}}{\mathop{dt}}
$$

> Current is **NOT** a vector

- Current density

![Current Density](https://gitee.com/sghuang19/assets/raw/master/img/20200818104136-current-density.png)

$$
i =
\frac{q}{t} =
\frac{nALe}{L/v_d} =
nAev_d.
$$

$$
\vec{J} = (ne)\vec{v}_d
$$

### Resistance

- Resistivity

$$
\rho = \frac{E}{J}
$$

- Resistance

$$
\rho = \frac{V/L}{I/A} \Rightarrow R = \frac{V}{I} = \frac{\rho L}{A}.
$$

### Ohm's Law

> For Ohmic contact cases

$$
V = iR
$$

---

## Ch. 27 Circuits

- **Kirchhoff's Rules**

$$
\sum I = 0,\quad \sum V = 0
$$

- Mark for RC Circuit

---

## Ch. 28 Magnetic Field

- On Moving Charge

$$
\vec{F} = q\vec{v}\times\vec{B}
$$

- Hall Effect

$$
n = \frac{Bi}{Vle}
$$

- On a Current Carrying Conductor

$$
\vec{F}_B = i\vec{l}\times\vec{B}
$$

- Magnetic Dipoles

![Magnetic Dipoles](https://gitee.com/sghuang19/assets/raw/master/img/20200819214835-magnetic-dipole.png)

$$
\bm{\mu} = NiA
$$

$$
\bm{\tau=\mu\times B}
$$

---

## Ch. 29 Magnetic Fields Due to Currents

- **Biot-Savart Law**

$$
\mathop{d\bm{B}} =
\frac{\mu_0}{4\pi}\frac{i\mathop{d\bm{l}}\times\bm{e}_r}{r^2}
$$

![Biot-Savart Law](https://gitee.com/sghuang19/assets/raw/master/img/20200819220729-Biot-Savart-Law.png)

- For B-Field of a wire with steady current

$$
B = \frac{\mu_0 i}{2\pi R}
$$

- B-Field at the center of a circular arc of wire

$$
B =
\int\mathop{dB} =
\int_0^\phi \frac{\mu_0}{4\pi}\frac{iR\mathop{d\phi}}{R^2} =
\frac{\mu_0 i}{4\pi R}
\int_0^\phi\mathop{d\phi} =
\frac{\mu_0 i\phi}{4\pi R}
$$

- **Gauss' Law for magnetism**

$$
\oint \vec{B}\cdot\mathop{d\vec{A}} = 0
$$

- **Ampere's Law**

$$
\oint\vec{B}\cdot\mathop{d\vec{l}} = \mu_0I_\text{encl}
$$

$$
\oint_\mathbf{l} \mathbf{B}\cdot\mathop{d\mathbf{l}} =
\mu_0 \int_\mathbf{A}\mathbf{J}\cdot\mathop{d\mathbf{A}}
$$

- B-Field of solenoid

$$
BL = \mu_0 nLI
$$

![Solenoid](https://gitee.com/sghuang19/assets/raw/master/img/20200819223558-solenoid.png)

- B-Field of toroid

![Toroid](https://gitee.com/sghuang19/assets/raw/master/img/20200819224820-toroid.png)

$$
B = \frac{\mu_0 NI}{2\pi r}
$$

- Current sheet

$$
B = \frac{1}{2}\mu_0 J_s
$$

---

## Ch. 30 Induction and Inductance

### Laws of Induction

- Lenz's Law
- Faraday's Law of Induction

$$
\mathscr{E} = -\frac{\mathop{d\Phi_B}}{\mathop{dt}}
$$

$$
-\frac{d}{dt}\int\limits_A\vec{B}\cdot\mathop{d\vec{A}} =
\oint\limits_l\vec{E}\cdot\mathop{d\vec{l}}
$$

$$
\nabla\times\mathbf{E} = -\frac{d\mathbf{B}}{dt}
$$

- Eddy Current

### Inductors

- Self induction

$$
\mathscr{E}_L = -L\frac{di}{dt}
$$

$$
L = \frac{N\Phi_B}{i}
$$

- Inductance of an ideal solenoid

$$
L = \mu_0n^2lA
$$

- Inductance of a toroid

$$
L = \frac{\mu_0N^2b}{2\pi}\ln\frac{r_2}{r_1}
$$

### RL Circuit

$$
\mathscr{E} -i(t)R - L\frac{di}{dt} = 0
\Rightarrow \frac{di}{dt} + \frac{iR}{L} = \frac{\mathscr{E}}{L}
$$

$$
i(t) = \frac{\mathscr{E}}{R}(1 - e^{-t/\tau_L}), \quad \tau_L = L/R
$$

- Energy stored in magnetic field

$$
i\mathscr{E} = Li\frac{di}{dt} + i^2R
\Rightarrow U_B = \int_0^t Li\mathop{di} =
\frac{1}{2}Li^2
$$

- Energy density of magnetic field

$$
u_B =
\frac{Li^2}{2Al} =
\frac{U_B}{Al} =
\frac{\mu_0n^2Ai^2}{2A} =
\frac{\mu_0n^2i^2}{2} =
\frac{B^2}{2\mu_0}
$$

### Mutual Induction

$$
\mathscr{E}_2 = -M\frac{di_1}{dt},\quad
\mathscr{E}_1 = -M\frac{di_2}{dt}
$$

---

## Ch. 31 EM Oscillation & AC Current \*

$$
U_C = \frac{q^2}{2C}, \quad
U_B = \frac{Li^2}{2}, \quad
$$

$$
-L\frac{di}{dt} - \frac{q}{C} = 0
\Rightarrow \frac{d^2q}{dt^2} + \frac{q}{LC} = 0
$$

$$
\Rightarrow
-A\omega^2\cos(\omega t + \phi) +
\frac{A}{LC}\cos(\omega t + \phi) = 0, \quad
\omega = \frac{1}{\sqrt{LC}}
$$

### Damped Oscillation in LRC Circuit

### Forced Oscillations

- capacitive reactance

$$
X_C = \frac{1}{\omega_d C}
$$

> Voltage leads the current

- inductive reactance

$$
X_L = \omega_d L
$$

> Voltage lags the current

- Impedance

$$
Z = \sqrt{R^2 + (X_L - X_C)^2}, \quad
I = \frac{\mathscr{E}}{Za}
$$

### Power in AC Circuits

$$
P_\text{avg} = \mathscr{E}_\text{rms}I_\text{rms}\cos\phi, \quad
\cos\phi = \frac{V_R}{\mathscr{E}_m} = \frac{R}{Z}
$$

### Transformers

$$
V_1I_1 = V_2I_2, \quad
\frac{V_2}{V_1} = \frac{N_2}{N_1}
$$

---

## Ch. 32 Maxwell’s Equations; Magnetism of Matter \*

- Integral Form

$$
\left\{ \begin{aligned}
    & \oint_{\mathbf{A} = \partial V}
    \mathbf{E}\cdot\mathop{d\mathbf{A}} =
    \frac{q_\text{enc}}{\epsilon_0}
    & \quad\text{Gauss' Law} \\
    & \oint_{\mathbf{A} = \partial V}
    \mathbf{B}\cdot\mathop{d\mathbf{A}} = 0
    & \quad\text{Gauss' Law for B-Field} \\
    & \oint_{\mathbf{l} = \partial \mathbf{A}}
    \mathbf{E}\cdot\mathop{d\mathbf{l}} = -
    \frac{d}{dt} \int_\mathbf{A}
    \mathbf{B}\cdot\mathop{d\mathbf{A}}
    & \quad\text{Faraday's Law} \\
    & \oint_{\mathbf{l} = \partial\mathbf{A}}
    \mathbf{B}\cdot\mathop{d\mathbf{l}} =
    \mu_0\left(
        \int_\mathbf{A} \mathbf{J}\cdot\mathop{d\mathbf{A}} +
        \epsilon_0\frac{d}{dt}
        \int_\mathbf{A} \mathbf{E}\cdot\mathop{d\mathbf{A}}
    \right)
    & \quad\text{Ampere' Law}
\end{aligned} \right.
$$

- Maxwell's Law of Induction

$$
\oint_\mathbf{l} \mathbf{B}\cdot\mathop{d\mathbf{l}} =
\mu_0\epsilon_0\frac{d\Phi_E}{dt} =
\mu_0\epsilon_0\frac{d}{dt}
\int_\mathbf{A} \mathbf{E}\cdot\mathop{d\mathbf{A}}
$$

- displacement current

$$
i_d = \epsilon_0\frac{d\Phi_E}{dt}
$$

- Differential Form

$$
\left\{ \begin{aligned}
    & \nabla\cdot\mathbf{E} =
    \frac{\rho}{\epsilon_0} \\
    & \nabla\cdot\mathbf{B} = 0 \\
    & \nabla\cdot\mathbf{E} = -
    \frac{\partial\mathbf{B}}{\partial t} \\
    & \nabla\cdot\mathbf{B} = \mu_0\left(
        \mathbf{J} +
        \epsilon_0\frac{\partial\mathbf{E}}{\partial t}
    \right) \\
\end{aligned} \right.
$$

---

## Ch. 33 Electromagnetic Waves \*

$$
\left\{ \begin{aligned}
    & \nabla^2\mathbf{B} -
    \mu_0\epsilon_0\frac{\partial^2\mathbf{B}}{\partial t^2} = 0 \\
    & \nabla^2\mathbf{E} -
    \mu_0\epsilon_0\frac{\partial^2\mathbf{E}}{\partial t^2} = 0
\end{aligned} \right.\Rightarrow
\left\{ \begin{aligned}
    & \mathbf{E}(\mathbf{r},t) = \mathbf{E}_0
    \cos(\omega t - \mathbf{k}\cdot\mathbf{r} + \phi_0) \\
    & \mathbf{B}(\mathbf{r},t) = \mathbf{B}_0
    \cos(\omega t - \mathbf{k}\cdot\mathbf{r} + \phi_0)
\end{aligned} \right.
$$

$$
k = |\mathbf{k}| = \frac{\omega}{c} = \frac{2\pi}{\lambda}
$$

$$
\left|\frac{\mathbf{E}_0}{\mathbf{B}_0}\right| =
c = \frac{1}{\sqrt{\mu_0\epsilon_0}}
$$

![EM Waves](https://gitee.com/sghuang19/assets/raw/master/img/20200820201837-emwaves.png)

### Energy Transfer in EM Waves

$$
u_\text{total} = \epsilon_0E^2 = \epsilon_0EBc = \frac{EB}{\mu_0}
$$

- **Poynting Vector**

$$
\vec{S} = \frac{1}{\mu_0}\vec{E}\times\vec{B}
$$

- **Intensity**

$$
I =
S_\text{avg} =
\frac{E_0B_0}{2\mu_0} =
\frac{E_0^2}{2\mu_0c} =
\frac{E^2_\text{rms}}{\mu_0c}
$$

$$
\frac{\text{average power}}{4\pi r^2} \propto \frac{1}{r^2}
$$

### Polarization

When a unpolarized light passes through a polarizer, half of the intensity is
loss

$$
I - \frac{1}{2}I_0
$$

![Polarizer](https://gitee.com/sghuang19/assets/raw/master/img/20200820203628-polarizer.png)

$$
I_2 = I_1\cos^2\phi
$$

### Reflection & Refraction

![Reflection & Refraction](https://gitee.com/sghuang19/assets/raw/master/img/20200820203903-refraction-reflection.png)

- **Snell's Law**

$$
\frac{\sin\theta_1}{\sin\theta_2} =
\frac{n_\text{water}}{n_\text{air}},\quad
n = c/v = \frac{\lambda_\text{vacuum}}{\lambda_\text{medium}}
$$

- Fermat's Principle in Optics
- Total Internal Reflection

$$
\sin\theta_\text{critical} = \frac{n_2}{n_1}
$$

- Light in a Raindrop \*
- Polarization bt reflection

![Brewster Angle](https://gitee.com/sghuang19/assets/raw/master/img/20200820204607-Brewster.png)

$$
\theta_B = \tan^{-1}\frac{n_2}{n_1}
$$

---

## Ch. 35 Interference \*

### Young's Interference

![image-20200820205311296](https://gitee.com/sghuang19/assets/raw/master/img/20200820205313-Young-actual.png)

![image-20200820205339402](https://gitee.com/sghuang19/assets/raw/master/img/20200820205340-Young-approx.png)

$$
d\sin\theta = m\lambda\Rightarrow
y_m = R\tan\theta_m\approx R\sin\theta_m = R\frac{m\lambda}{d}
$$

- Intensity of interference pattern

$$
\phi = \frac{2\pi d}{\lambda}\sin\theta, \quad
I = 4I_0\cos^2\frac{1}{2}\phi
$$

### Thin-Film Interference

- Half wavelength shift

## Ch. 36 Diffraction

### Single Slit Diffraction

![Fraunhofer Single Slit](https://gitee.com/sghuang19/assets/raw/master/img/20200820211501-Fraunhofer-Single-Slit.png)

(of dark fringes)

$$
\sin\theta = \frac{m\lambda}{a}
$$

$$
I = I_0\left[\frac{\sin(\beta/2)}{\beta/2}\right]^2, \quad
\beta = \frac{2\pi}{\lambda}a\sin\theta
$$

> Single-Slit diffraction envelope in double slit interference

### Diffraction on Multiple Slits

- Principal Maxima

$$
\sin\theta_n = n\lambda/d
$$

- Interference Minima

($Nd$ is the total width of N-slits)

$$
\sin\theta_s = s\lambda/(Nd)
$$

- Subsidiary Maxima
- Single-Slit Diffraction Envelope

### Diffraction Gratings

- Dispersion

The angular separation of two lines whose wavelengths differ by a certain amount

$$
D = \frac{\Delta\theta}{\Delta\lambda} = \frac{m}{d\cos\theta}
$$

- Resolving Power

$$
\Delta\theta_\text{hw} = \frac{\lambda}{Nd\cos\theta}
\Rightarrow R = \frac{\lambda}{\Delta\lambda} = Nm
$$

- Rayleigh’s criterion of resolvability

## Ch. 37 Special Relativity

- Lorentz's Factor

$$
\gamma = \frac{1}{\sqrt{1 - u^2/c^2}}
$$

- Time dilation

$$
t = \frac{1}{\sqrt{1 - (v/c)^2}}t' = \gamma t'
$$

- Length contraction

$$
L = L'\sqrt{1 - (v/c)^2} = L'/\gamma
$$

- Lorentz Transformation

...

$$
u = \frac{u' + v}{1 + vu'/c^2}
$$
