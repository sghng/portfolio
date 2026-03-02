---
title: Fundamentals of Electric Circuits Review
mathjax: true
tags: [ee, circuits, physics]
date: 2020-08-31
permalink: circuits/
---

<!-- cSpell:words supernode supermesh Thevenin Thevenin's subtractor -->

This document is intended for the reviewing of the course Fundamentals of
Electric Circuits.

## Preface

### Current

Current is the rate of charge flow past a given point in a given direction.

$$
i = \frac{\mathop{dq}}{\mathop{dt}}
$$

### Voltage

Voltage is the energy required to move 1 C of charge through an element.

$$
v = \frac{dw}{dq}
$$

### Power

Power is the energy supplied or absorbed per unit time.

$$
p = \frac{dw}{dt} = vi
$$

### Passive Sign Convention

> Passive sign convention is satisfied if the direction of current is selected
> such that current **enters** through the terminal that is more **positively**
> biased.

### Law of Energy Conservation

$$
\sum p = 0
$$

### Sources

- An ideal voltage source has **zero internal resistance** and is capable of
  producing **any amount of current**.
- An ideal current source has **infinite resistance**. It is able to generate
  **any voltage** to establish the desired current through it.
- Ideal dependent source

<!-- more -->

## Basic Laws

### Ohm's Law

$$
v = Ri
$$

$$
i = Gv
$$

$$
p = vi = i^2R = v^2G = \frac{v^2}{R} = \frac{i^2}{G}
$$

$$
R = \rho\frac{l}{A}
$$

- open circuit and short circuit

### Topology

- A branch represents any **single element** in a circuit.
- A node is the **point of connection** between two or more branches.
- A loop is any **closed path** in a circuit.
- A set of loops is said **independent** when any of them contains at least one
  **new branch** in addition to all others.
- A mesh is a loop which does not contain any other loops within it.

$$
b = m + n - 1
$$

### Kirchhoff's Law

- Principle of the Conservation of Charge

#### Kirchhoff's Current Law (KCL)

The algebraic sum of currents entering a node (or a closed boundary) is zero. In
other words, the sum of the currents entering a node is equal to that leaving
the node.

$$
0 = \frac{dq}{dt} = \sum_{n = 1}^N i_n
$$

#### Kirchhoff's Voltage Law (KVL)

- The algebraic sum of all voltages around a loop is zero.
- Sum of voltage drops = Sum of voltage rises.

$$
\sum_{m=1}^M w_m = 0 = \sum_{m=1}^M qv_m
\Rightarrow \sum_{m=1}^M v_m = 0
$$

### Equivalent Circuits/Sources

Two circuits (or sources) are said to be equivalent if they have the same
$V\text{-}I$ relationship at their terminals.

#### Resistance

$$
R_\text{eq} = \frac{R_1R_2}{R_1 + R_2}, \quad
G_\text{eq} = G_1 + G_2
$$

#### The Principle of Voltage Division

Resistors in series

$$
v_n = \frac{R_n}{\sum_{n=1}^N R_n} v
$$

#### The Principle of Current Division

Resistors in parallel

$$
i_n = \frac{G_n}{\sum_{n=1}^N G_n}
$$

#### Wye-Delta Transformation

![Wye Delta Transformation](https://gitee.com/sghuang19/assets/raw/master/img/20200829165144-Wye-Delta-Transformation.png)

- Delta to Wye

$$
\left\{
\begin{aligned}
R_1 = \frac{R_bR_c}{R_a + R_b +R_c} &\\
R_2 = \frac{R_cR_a}{R_a + R_b +R_c} &\\
R_3 = \frac{R_aR_b}{R_a + R_b +R_c} &\\
\end{aligned}
\right.
$$

- Wye to Delta

$$
\left\{
\begin{aligned}
R_a = R_2 + R_3 + \frac{R_2R_3}{R_1} &\\
R_b = R_1 + R_3 + \frac{R_1R_3}{R_2} &\\
R_c = R_1 + R_2 + \frac{R_1R_2}{R_3} &\\
\end{aligned}
\right.
$$

Y-networks is more like a serial connection, and Δ network is more like a
parallel connection.

$$
R_Y < R_\Delta
$$

When the Y and Δ network is **balanced**

$$
\left\{
\begin{aligned}
R_1 = R_2 =  R_3 = R_Y \\
R_a = R_b = R_c = R_\Delta
\end{aligned}
\right.\Rightarrow\left\{
\begin{aligned}
& R_Y = \frac{R_\Delta}{3}\\
& R_\Delta = 3R_Y\\
\end{aligned}
\right.
$$

## Systematic Methods for Circuit Analysis

### Nodal Voltage Analysis

1. Choose one node as the **reference node**, then **label** the voltage on the
   remaining nodes
2. Apply **KCL** to each non-reference nodes, branch currents represented **in
   terms of node voltages** according to **Ohm's Law**
3. Solve the $n-1$ simultaneous equations

- Nodal analysis with voltage sources

- Case 1 - the V-source connects to the reference node
- Case 2 - the V-source connects to two non-reference nodes
  - Treat these two nodes as one **supernode**

> Nodal analysis is good for
>
> - The network contains many elements connected in **parallel**
> - The network contains many **current sources**
> - The circuit has fewer nodes than meshes
> - Node voltages are what being solved for

### Mesh Current Analysis

1. **Label** the mesh currents
2. Apply **KVL** to each of the $n$ meshes, write the voltages across each
   elements **in terms of the mesh currents** according to the **Ohm’s Law**
3. Solve the $n$ simultaneous equations

> Always consider the circuit in **clockwise** direction

- Mesh analysis with current sources
- Case 1 - the current source is **NOT** shared by multiple meshes
- Case 2 - the current source **IS** shared by multiple meshes
  - Treat the two sharing meshes as one **supermesh**

> Mesh analysis is applicable for **planar** circuits Mesh analysis is good for
>
> - The network contains many **serially** connected elements
> - The network contains many **voltage sources**
> - The circuit has fewer meshes than nodes
> - Branch or mesh currents are what being solved for

## Circuit Theorems

### Linear Circuits

- Homogeneity\Scaling Property

$$
f(\alpha x) = \alpha f(x) = \alpha y
$$

- Additivity Property

$$
\left\{\begin{aligned}
y_1 = f(x_1) \\
y_2 = f(x_2)
\end{aligned}\right.\Rightarrow
f(x_1 + x_2) = y_1 + y_2
$$

- Linearity

$$
f(\alpha x_1 + \beta x_2) = \alpha y_1 + \beta y_2
$$

### Superposition Theorem

In a linear system, the voltage across (or current through) an element is the
**algebraic sum** of those caused by **each independent source** acting alone

1. **Turn off** all independent source except one, find the output
2. Repeat Step 1 for other sources
3. **Adding up**

### Source Transformation

> two circuits are **equivalent** if their **voltage versus current**
> ($v\text{-}i$) **relations** at **port** are identical

### Thevenin's Theorem

> A **linear two terminal circuit** can be replaced by an equivalent circuit
> consisting of a **voltage source** $V_\text{Th}$ in **series** with a
> **resistor** $R_\text{Th}$ .

![Finding Thevenin equivalent circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200829205418-finding-Thevenin-equivalent-circuit.png)

1. **Open the circuit**, to find out the voltage between terminals
2. Add an **assumed source** (generally voltage source), then calculate the
   equivalent resistance

> **Maximum Power Transfer**
>
> $$
> R_L = R_\text{Th},\quad
> p_\text{max} =\frac{V_\text{Th}^2}{4R_\text{Th}}
> $$

### Norton's Theorem

> A **linear two terminal circuit** can be replaced by an equivalent circuit
> consisting of a **current source** $I_\text{N}$ and a **parallel** >
> **resistor** $R_\text{N}$

1. Find the **open-circuit voltage**
2. Find the **short-circuit current**
3. The **equivalent or input resistance** $R_\text{in}$ at terminals when all
   independent sources are turned off

## Operational Amplifiers

### Basics of Op-Amp

Op amp is an **active electric element**

![Op amp](https://gitee.com/sghuang19/assets/raw/master/img/20200829222710-op-amp.png)

- input resistance
- output resistance
- open loop voltage gain

![image-20200829223111173](https://gitee.com/sghuang19/assets/raw/master/img/20200829223112-op-amp.png)

> **Ideal op amp**
>
> 1. $R_o\approx 0$
> 2. $R_i = \infty\Rightarrow i_1\approx 0, i_2\approx 0$
> 3. $A\approx\infty\Rightarrow v_1\approx v_2$
>
> **virtual opening** and **virtual shorting**

### Inverting Amplifier

![inverting amplifier](https://gitee.com/sghuang19/assets/raw/master/img/20200829223959-inverting-amp.png)

$$
v_0 = -\frac{R_f}{R_1}v_i
$$

### Trans-Resistance Amplifier

![image-20200829224118335](https://gitee.com/sghuang19/assets/raw/master/img/20200829224120-trans-resistance-amplifier.png)

$$
\frac{v_o}{i_s} = -R
$$

### Summing Amplifier/Summer

![Summing Amplifier/Summer](https://gitee.com/sghuang19/assets/raw/master/img/20200829224216-summing-amplifier.png)

$$
v_0 = -\left(
\frac{R_f}{R_1}v_1 +
\frac{R_f}{R_2}v_2 +
\frac{R_f}{R_3}v_3
\right)
$$

### Non-Inverting Amplifier

![Non-Inverting Amplifier](https://gitee.com/sghuang19/assets/raw/master/img/20200829225047-Non-Inverting-Amplifier.png)

$$
A_v = \frac{v_o}{v_i} = 1 + \frac{R_f}{R_1}
$$

### Voltage Follower

> Also named **unity gain amplifier**

![Voltage Follower](https://gitee.com/sghuang19/assets/raw/master/img/20200829234048-voltage-follower.png)

### Difference Amplifier

![Difference Amplifier](https://gitee.com/sghuang19/assets/raw/master/img/20200829234310-difference-amplifier.png)

$$
v_o =
\frac{R_2(1 + R_1/R_2)}{R_1(1+R_3/R_4)}v_2 - \frac{R_2}{R_1}v_1
$$

> If $R_1 = R_2, R_3 = R_4$, this becomes a **subtractor**

## Capacitors and Inductors

### Capacitor

$$
q = Cv
$$

For planar capacitor

$$
C = \frac{\epsilon A}{d}
$$

$$
v(t) =
\frac{1}{C}\int_{-\infty}^t
i(\tau)\mathop{d\tau} + v(t_0)
$$

$$
i = \frac{dq}{dt} = C\frac{dv}{dt}
$$

$$
w = \frac{1}{2}Cv^2 = \frac{q^2}{2C}
$$

- Capacitor is **open circuit to dc**
- **Voltage** on a capacitor must be **continuous**
- In **parallel**: $C_{eq} = C_1 + C_2 + \cdots + C_N$
- In **series**:
  $\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots + \frac{1}{C_N}$

### Inductor

$$
v = L\frac{di}{dt}
$$

For solenoid

$$
L = \frac{N^2\mu A}{l}
$$

$$
i(t) =
\frac{1}{L}\int_{-\infty}^t
v(\tau)\mathop{d\tau} + i(t_0)
$$

- Inductor is **short circuit to dc**
- **Current** on a inductor must be **continuous**
- In **parallel**:
  $\frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2} + \cdots + \frac{1}{L_N}$
- In **series**: $L_{eq} = L_1 + L_2 + \cdots + L_N$

## Singularity Functions

### Step Function

### Impulse/Delta Function

$$
\int_{0^-}^{0^+} \delta(t)\mathop{dt} = 1
$$

### Unit Ramp Function

### Relationship

- In form of differentiation

$$
\delta(t) = \frac{du(t)}{dt},\quad
u(t) = \frac{dr(t)}{dt}
$$

- In form of integration

$$
u(t) = \int_{-\infty}^t \delta(\lambda)\mathop{d\lambda},\quad
r(t) = \int_{-\infty}^t u(\lambda)\mathop{d\lambda}
$$

## First Order Circuits

### Source-Free $RC$ Circuit

![Source-Free RC Circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200830103010-source-free-RC-circuit.png)

$$
v(t) = V_0e^{-t/RC} = V_0e^{-t/\tau}
$$

- natural response
- decay rate

$$
w_R(t) = \frac{1}{2}CV_0^2 \left(1-e^{-2t/\tau}\right)
$$

- initial voltage
- time constant

### Source-Free $RL$ Circuit

![Source-Free RL Circuit](https://gitee.com/sghuang19/assets/raw/master/img/202008301036020-source-free-RL-circuit.png)

$$
i(t) = i(0)e^{-Rt/L} = i(0)e^{-t/\tau},\quad \tau = \frac{L}{R}
$$

$$
w_R(t) = \frac{1}{2}LI_0^2 \left(1-e^{-2t/\tau}\right)
$$

- initial current
- time constant

### Step Response of $RC$ Circuit

![Step Response of RC Circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200830104007-step-response-of-RC-circuit.png)

- Complete/Total Response

$$
v(t) =
\left\{\begin{aligned}
& V_0, & t < 0 \\
& V_s + (V_0 - V_s)e^{-t/\tau}, & t > 0
\end{aligned}\right.,\quad \tau = RC
$$

- natural response
- forced response

or

- transient response
- steady-state response

### Step Response of $RL$ Circuit

![Step Response of RL Circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200830104444-step-response-of-RL-circuit.png)

$$
i(t) =
\left\{\begin{aligned}
& I_0, & t < 0 \\
& \frac{V_s}{R} + \left(I_0 - \frac{V_s}{R}\right)e^{-t/\tau}, & t > 0
\end{aligned}\right.,\quad \tau = \frac{L}{R}
$$

> $$
> \text{Instantaneous value} =
> \text{Final} + (\text{Initial} - \text{Final})e^{-(t-t_0)/\tau}
> $$

---

## Second Order Circuits

### Source-Free Series $RLC$ Circuits

![ Source-Free Series RLC Circuits](https://gitee.com/sghuang19/assets/raw/master/img/20200830142143-%20Source-Free-Series-RLC-Circuits.png)

$$
Ri +
L\frac{di}{dt} +
\frac{1}{C}\int_{-\infty}^t i(\tau)\mathop{d\tau} = 0
\Rightarrow
\frac{d^2i}{dt^2} + \frac{R}{L}\frac{di}{dt} + \frac{i}{LC} = 0
$$

The solution is in the form of

$$
i(t) = A_1e^{s_1t} + A_2e^{s_2t}
$$

In which

$$
\begin{aligned}
& \Rightarrow
s^2 + \frac{R}{L}s + \frac{1}{LC} = 0 \\
& \Rightarrow
s_1 =
-\alpha + \sqrt{\alpha^2 - \omega_0^2}, \quad
s_2 =
-\alpha - \sqrt{\alpha^2 - \omega_0^2}
\end{aligned}
$$

Where $\alpha = R/2L$ is **damping factor**, $\omega_0 = 1/\sqrt{LC}$ is
**resonant frequency**.

- **over damped**, $\alpha > \omega_0$
- **critically damped**, $\alpha = \omega_0$
- **under damped**, $\alpha < \omega_0$
- **undamped**, $\alpha = 0$

### Source-Free Parallel $RLC$ Circuits

![Source-Free Parallel RLC Circuits](https://gitee.com/sghuang19/assets/raw/master/img/20200830144807-Source-Free-Parallel-RLC-Circuits.png)

$$
\frac{v}{R} +
\frac{1}{L}\int_{-\infty}^t v(\tau)\mathop{d\tau} +
C\frac{dv}{dt} = 0
\Rightarrow
\frac{d^2v}{dt^2} + \frac{1}{RC}\frac{dv}{dt} + \frac{1}{LC}v = 0
$$

The general solution is

$$
v(t) = A_1e^{s_1t} + A_2e^{s_2t}
$$

Where

$$
\alpha = \frac{1}{2RC},\quad \omega_0 = \frac{1}{\sqrt{LC}}
$$

### Step Response of Series $RLC$ Circuit

![Step Response of Series RLC Circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200830160927-Step-Response-of-Series-RLC-Circuit.png)

- Over damped - $v(t) = V_s + A_1e^{s_1t} + A_2e^{s_2t}$
- Critically damped - $v(t) = V_s + (A_1 + A_2t)r^{-\alpha t}$
- Under damped -
  $v(t) = V_s + (A_1\cos\omega_dt + A_2\sin\omega_dt)e^{-\alpha t}$

$$
\alpha = \frac{R}{2L}
$$

### Step Response pf Parallel $RLC$ Circuit

![Step Response pf Parallel RLC Circuit](https://gitee.com/sghuang19/assets/raw/master/img/20200830161016-Step-Response-of-Parallel-RLC-Circuit.png)

- Over damped - $i(t) = I_s + A_1e^{s_1t} + A_2e^{s_2t}$
- Critically damped - $i(t) = I_s + (A_1 + A_2t)r^{-\alpha t}$
- Under damped -
  $i(t) = I_s + (A_1\cos\omega_dt + A_2\sin\omega_dt)e^{-\alpha t}$

$$
\alpha = \frac{1}{2RC}
$$

---

## Sinusoids and Phasors

### Sinusoids

$$
v(t) = V_m\sin(\omega t + \phi)
$$

- amplitude
- angular frequency
- argument
- phase
- period
- leads
- lags
- out of phase
- in phase
- anti phase

### Complex Number

- rectangular form $z = x + jy$
- polar form $z = r\angle{\phi}$
- exponential form $z = re^{j\phi}$

Where $r = \sqrt{x^2 + y^2}$ is the **modulus**, $\phi = \tan^{-1}\frac{y}{x}$
is the **argument**.

- multiplication

$$
z_1z_2 = r_1r_2\angle(\phi_1 + \phi_2)
$$

- division

$$
\frac{z_1}{z_2} = \frac{r_1}{r_2}\angle(\phi_1 - \phi_2)
$$

- reciprocal

$$
\frac{1}{z} = \frac{1}{r}\angle(-\phi)
$$

- square root

$$
\sqrt{z} = \sqrt{r}\angle(\phi/2)
$$

- complex conjugate

$$
z^* = x - jy = r\angle(-\phi) = re^{-j\phi}
$$

### Phasors

$$
v(t) =
V_m\cos(\omega t + \phi) =
\Re\left[V_me^{j(\omega t + \phi)}\right]
$$

Where $\mathbf{V} = V_me^{j\phi} = V_m\angle\phi$ is the **phasor**

|        Time Domain        |    Phasor Domain     |
| :-----------------------: | :------------------: |
| $\mathop{dv}/\mathop{dt}$ | $j\omega\mathbf{V}$  |
|    $\int v\mathop{dt}$    | $\mathbf{V}/j\omega$ |

### Generalized Ohm's Law

> $$
> \mathbf{V} = R\mathbf{I}
> $$
>
> $$
> \mathbf{V} = j\omega L\mathbf{I}
> $$
>
> $$
> \mathbf{I} = j\omega C\mathbf{V}
> $$

- resistance
- reactance
- impedance

$$
\mathbf{Z} + R + jX
$$

- admittance

| Element |             Impedance              |
| :-----: | :--------------------------------: |
|   $R$   |          $\mathbf{Z} = R$          |
|   $L$   |      $\mathbf{Z} = j\omega L$      |
|   $C$   | $\mathbf{Z} = \frac{1}{j\omega C}$ |

Ohm's Law

$$
\mathbf{V} = \mathbf{ZI}
$$

### Sinusoid Steady State Analysis

> To obtain **superposition theorem**, the sources in the circuit must have the
> **same frequency**

---

## AC Power Analysis

### Instantaneous Power

$$
\begin{aligned}
p(t) & = v(t)i(t) \\ & =
V_mI_m\cos(\omega t + \theta_v)\cos(\omega t + v_i) \\ & =
\frac{1}{2}V_mI_m\cos(2\omega t + \theta_v + \theta_i)
\end{aligned}
$$

### Average Power

- effective value / RMS value

$$
P = \frac{1}{2}V_mI_m\cos(\theta_v - \theta_i)
$$

- apparent power $S$
- power factor
- power factor angle
- complex power

$$
\mathbf{S} =
\frac{1}{2}\mathbf{V}\mathbf{I}^*=
\mathbf{V}_\text{rms}\mathbf{I}^*_\text{rms}
$$

- real power
- reactive / quadrature power

$$
P = \Re(\mathbf{S}), \quad Q = \Im(\mathbf{S})
$$

### Maximum Average Power Transfer

$$
P_\text{max} = \frac{|\mathbf{V}_\text{Th}|^2}{8R_\text{Th}}
$$

---

## Magnetically Coupled Circuits

### Faraday's Law pf electromagnetic induction

$$
e = N\frac{d\phi}{dt}
$$

### Self Inductance

self inductance

$$
v =
N\frac{d\phi}{dt} =
N\frac{d\phi}{di}\frac{di}{dt} =
L\frac{di}{dt}
$$

$$
L = N\frac{d\phi}{di_L}
$$

### Mutual Inductance

#### Dot Convention

If a current **enters** the **dotted terminal** of one coil, the reference
polarity of the mutual voltage in the second coil is **positive** at the
**dotted terminal** of the **second coil**.

![Dot Convention](https://gitee.com/sghuang19/assets/raw/master/img/20200830174000-dot-convention.png)

#### Cascade Connection

- Series aiding connection

![series aiding connection](https://gitee.com/sghuang19/assets/raw/master/img/20200830174229-series-aiding.png)

![series aiding connection](https://gitee.com/sghuang19/assets/raw/master/img/20200830174249-series-aiding.png)

$$
L = L_1 + L_2 + 2M
$$

Else opposing connected, should be minus $2M$

#### Coefficient of Coupling

$$
k =
\frac{\phi_{12}}{\phi_1} =
\frac{\phi_{12}}{\phi_{11} + \phi_{12}} =
\frac{M}{\sqrt{L_1L_2}}
$$

![image-20200830174801760](https://gitee.com/sghuang19/assets/raw/master/img/20200830174804-coefficient-of-coupling.png)

$$
M = k\sqrt{L_1L_2}
$$

### Transformers

#### Linear / Air-Core Transformers

![Transformer](https://gitee.com/sghuang19/assets/raw/master/img/20200830175402-transformer.png)

- input impedance
- reflected / coupled impedance

$$
\mathbf{Z}_\text{R} =
\frac{\omega^2M^2}{R_2 + j\omega L_2 + \mathbf{Z}_L}
$$

- port V-I property

$$
\begin{bmatrix}
\mathbf{V}_1 \\ \mathbf{V_2}
\end{bmatrix} =
\begin{bmatrix}
j\omega L_1 & j\omega M \\
j\omega M & j\omega L_2
\end{bmatrix} =
\begin{bmatrix}
\mathbf{I}_1 \\ \mathbf{I_2}
\end{bmatrix}
$$

#### Ideal Transformers

$$
\frac{V_2}{V_1} = \frac{N_2}{N_1}
$$

$$
\mathbf{Z}_\text{in} = \frac{\mathbf{Z}_L}{n^2}
$$

---

## Frequency Response

$$
\mathbf{Y}(\omega) = \mathbf{H}(\omega)\mathbf{X}(\omega)
$$

---

## Laplace Transform

- one-side / unilateral Laplace Transform

$$
\mathscr{L}[f(t)] = F(s) =
\int_{0^-}^\infty f(t)e^{-st}\mathop{dt}
$$

Where

$$
s = \sigma + j\omega
$$

$$
\mathscr{L}^{-1}[F(s)] = f(t) =
\frac{1}{2\pi j}\int_{\sigma - j\infty}^{\sigma + j\infty}
F(s)e^{st}\mathop{ds}
$$

### Properties

- Linearity

$$
\mathscr{L}[a_1f_1(t) + a_2f_2(t)] = a_1F_1(t) + a_2F_2(t)
$$

- Scale changing

$$
\mathscr{L}[f(at)] =
\frac{1}{a}F\left(\frac{s}{a}\right),\quad a > 0
$$

- Time shift

$$
\mathscr{L}[f(t-a)u(t-a)] = e^{-as}F(s), \quad a > 0
$$

- Frequency shift

$$
\mathscr{L}[e^{-at}f(t)] = F(s + a)
$$

- Differentiation in time domain

$$
\mathscr{L}\left[\frac{df(t)}{dt}\right] = sF(s) - f(0^-)
$$

- Initial value theorem

$$
f(0^+) = \lim_{s\rightarrow\infty} sF(s)
$$

- Final value theorem

$$
f(\infty) = \lim_{s\rightarrow 0} sF(s)
$$

- Higher order differentiation in time domain

$$
\mathscr{L}\left[\frac{d^nf(t)}{dt^n}\right] =
s^nF(s) - s^{n-1}f(0^-) - s^{n-2}\frac{df(0^-)}{dt} - \cdots -
\frac{d^{n-1}f(0^-)}{d^{n-1}}
$$

- Integration in time domain

$$
\mathscr{L}\left[\int_{0^-}^t f(x)\mathop{dx}\right] = \frac{F(s)}{s}
$$

- Differentiation in frequency domain

$$
\mathscr{L}[t^nf(t)] = (-1)^n\frac{d^nF(s)}{ds^n}
$$

...

![电路基础 -13 new3_页面_15](https://gitee.com/sghuang19/assets/raw/master/img/20200830203826-operational-transforms.png)

![电路基础 -13 new3_页面_16](https://gitee.com/sghuang19/assets/raw/master/img/20200830203858-functional-transforms.png)

### Method of Partial Expansion

#### Residue Method

- Case 1: Simple distinct **poles**

$$
F(s) = \frac{N(s)}{(s+p_1)(s+p_2)\cdots(s+p_n)}
$$

$$
\Rightarrow
F(s) =
\frac{k_1}{s + p_1} +
\frac{k_1}{s + p_2} +
\cdots +
\frac{k_1}{s + p_n}
$$

Where $k_i$ are known as **residuals**

By **Heaviside's Theorem**

$$
k_i = \left.(s + p_i)F(s)\right|_{s = -p_i}
$$

- Case 2: Repeated poles

...

#### Method of Algebra

#### Solving Equations at Specific Values

### Inverse Laplace Transform

![电路基础 -13 new3_页面_27](https://gitee.com/sghuang19/assets/raw/master/img/20200830204925-inverse-Laplace-transform.png)

### Convolution Integral

$$
x(t) =
\int_{-\infty}^{\infty}
x(\lambda)\delta(t - \lambda)\mathop{d\lambda} =
x(t) * h(t)
$$

![电路基础 -13 new3_页面_31](https://gitee.com/sghuang19/assets/raw/master/img/20200830205313-convolution-properties.png)

![img](https://img-blog.csdn.net/20151204210049091)

## Circuit Analysis in $s$-Domain

1. **Transform** the circuit from the time domain to the $s$-domain
2. **Solve** the circuit using nodal analysis, mesh analysis, etc.
3. Take the **inverse transform** of the solution and thus obtain the solution
   in the time domain

- inductor

$$
V(s) = sLI - Li(0^-), \quad
I(s) = \frac{1}{sL}V(s) + \frac{i(0^-)}{s}
$$

- capacitor

$$
V(s) = \frac{1}{sC}I(s) + \frac{v(0^-)}{s}, \quad
I(s) = C[sV - v(0^-)]
$$

- impedance

|  Resistor  |  Inductor   |   Capacitor   |
| :--------: | :---------: | :-----------: |
| $Z(s) = R$ | $Z(s) = sL$ | $Z(s) = 1/sC$ |
