---
title: YOLO-v5 网络在华为 Atlas 200DK 开发板上的部署
date: 2021-12-30
tags: [yolo, ml, huawei, cv, pytorch, python, tensorflow]
permalink: atlas/
---

<!-- cSpell:words YOLO, Yanshee -->

> 在目前的调试中，选择了最新的 `YOLO-v5` 网络，但不排除后期根据需求进行替换。
>
> 华为的 Atlas 200DK 开发板，其功能极不全面，文档极不完善，其前后端、代码、文
> 档、环境，甚至于简单的版本号等都极为混乱，软硬件兼容性、泛用性都极差，其广告
> 语"30 分钟快速搭建 AI 开发环境"恐有所失实，我们极其不建议使用这款产品进行 AI
> 开发。

<!-- more -->

## 网络部署

在进行网络部署的过程中，我们注意到由于华为 Atlas 200DK 上的部署具有高度的耦合
性、内聚性，且其文档又极不完善，我们从着手之初就彻底排除了自行设计网络、将其转化
等的可能性，而只有可能是基于已经完成的例程进行二次开发。

### ~~基于 TensorFlow 的网络~~

> 该方案证实为不可行的。

<!-- cSpell:words Caffe -->

依据华为官方文档
[Atlas 应用/模型转化/简介](https://support.huaweicloud.com/mcg-atlas200app/atlasmcg_05_c30_0002.html)一
节的介绍，转化过程中所支持的网络框架仅有 TensorFlow 与 Caffe 两种，因此，我们首
先尝试寻找这类例程。

> 官方文档：
>
> 本文介绍如何将开源框架的网络模型，例如 Caffe、TensorFlow 等框架训练好的模型，
> 通过 OMG（Offline Model Generator：离线模型生成器）将其转换成昇腾AI处理器支持
> 的离线模型，模型转换过程中可以实现算子调度的优化、权值数据重排、量化压缩、内存
> 使用优化等，可以脱离设备完成模型的预处理。

<!-- cSpell:ignore YOLOV3 -->

在华为给出的例程仓库
[Ascend/samples](https://gitee.com/ascend/samples/tree/master) 中，提供了大量的
样例，涵盖 C++ 与 Python 两种语言，以及各类不同等级的计算机视觉应用。例
如，[`YOLOV3_coco_detection_picture`](https://gitee.com/ascend/samples/tree/master/python/level2_simple_inference/2_object_detection/YOLOV3_coco_detection_picture)
中就给出了使用 YOLOv3 网络对 COCO 数据集进行图像检测的样例。但是，其中的 `src`
目录中仅包含 `object_detect.py` 一个文件，只能基于 Ascend 开发板的 ACL 包利用既
有的转化完成的 `.om` 模型进行推理，且其文档语焉不详，代码前后处理十分抽象，没有
原始的网络定义，找不到训练的入口和数据集的组织形式，因此无法进行在 COCO 数据集上
进行测试以外的用途。

在 GitHub 上检索基于 TensorFlow 的 YOLOv3 网络，我们发现了由
[@YunYang1994](https://github.com/YunYang1994) 所贡献的
[TensorFlow `2.x` 功能展示](https://github.com/YunYang1994/TensorFlow2.0-Examples)
以及
[基于 TensorFlow `1.x` 的 YOLOv3 网络](https://github.com/YunYang1994/tensorflow-yolov3)，
作者的代码质量十分之高，因此我们决定在这一项目的基础上进行开发。但是，在
TensorFlow 的使用中我们发现，相较于 PyTorch 框架，TensorFlow 对用户更不友好，其
对于环境的要求极为苛刻，特别是要启用对其的GPU支持更需要NVIDIA驱动、CUDA 工具
包、Python、cuDNN、TensorFlow 等多个软硬件环境的完美匹配。在尝试了虚拟
机、WSL、Docker 等方案后，我们放弃了在本地对 TensorFlow 网络进行训练的尝试。同
时，将基于 TensorFlow 框架的网络利用 ModelArts 进行云端训练也已被排除。综上，我
们也意识到基于 TensorFlow 的网络部署方案或根本不具有可行性。

总而言之，在互联网上所能够检索到的 YOLO 网络在 Atlas 200DK 上的部署的有关介绍只
有以下几类：

- 只给出了训练好的 `.om` 模型，以及基于 ACL 的推理文件
- 只给出了网络源码，而没有模型的转换过程
- 给出了网络源码，但高度耦合，文档不详，基本无法用以进行训练

而没有一个工程能够涵盖前处理、模型训练、模型转化、在 Atlas 200DK 上的推理、后处
理的全流程，而自行开发又几乎不具有可行性。

### 基于 PyTorch 与 ATC 转化工具的网络

> "Life is short, I use PyTorch."

在 ModelArts 平台的使用中，我们发现，华为将大量内置的算法集成
在[昇腾社区](https://www.hiascend.com/)中的
[ModelZoo](https://www.hiascend.com/software/modelzoo) 这一平台中，经检索，其中
提供了基于 PyTorch 框架的 YOLO 网络的 `v3`、`v4`、`v5` 版本，且在标题中注明了
ATC。我们选用目前下载量最大
的[`ATC YoloV5 (FP16)`](https://www.hiascend.com/zh/software/modelzoo/detail/1/f7338e43cf024ea1851fb46041be1dea)网
络进行测试。该例程包含了完整的

<!-- cSpell:ignore yolov -->

下载源代码包，解压，并将其重命名为 `yolov5-hw` 以示区分。

> 下载的代码包中包含的自述文件较为详细地介绍了部署方法，除算子包升级替换外，以下
> 内容大多为对其的复述。

拉取网络源码仓库，下称 `yolov5`。

```bash
git clone -b v2.0 https://github.com/ultralytics/yolov5.git
```

利用 `yolov5` 中的 `export.py` 脚本，对 `yolov5-hw` 中的 `yolov5s.pt` 模型文件进
行转换，得到 `ONNX` 模型文件 `yolov5s.onnx`。

> 可选择复制模型文件到 `yolov5` 中，也可以手动指定模型文件路径。

```bash
python models/export.py --weights ./yolov5s.pt --img 640 --batch 1
```

对导出的 `ONNX` 模型使用 `onnx-simplifier` 工具进行简化。

<!-- cSpell:words onnxsim -->

```bash
pip install onnx-simplifier
python -m onnxsim --skip-optimization yolov5s.onnx yolov5s_sim.onnx
```

运行 `yolov5-hw` 中的 `model_yolov5.py` 对生成的 `ONNX` 模型进行修改，得到
`yolov5s_sim_t.onnx`。

```shell
python modify_yolov5.py yolov5s_sim.onnx
```

> 直接运行该命令，Python 将有可能抛出错误。在测试过程中，错误出现在 `53` 及 `54`
> 行：
>
> ```python
> model.graph.node.remove(get_node_by_name(model.graph.node, "Slice_24"))
> model.graph.node.remove(get_node_by_name(model.graph.node, "Slice_34"))
> ```
>
> 此时将此两行代码注释即可继续进行模型修改。

在 MindStudio 环境下即可利用 ATC 工具进行转换。

<!-- cSpell:words NCHW -->

```bash
atc --model=yolov5s_sim_t.onnx --framework=5 --output=yolov5s_bs1 --input_format=NCHW --log=error --soc_version=Ascend310 --input_shape="images:1,3,640,640" --enable_small_channel=1 --input_fp16_nodes="images" --output_type=FP16
```

若直接运行指令，将会出现报错：

<!-- cSpell:words bsdgames -->

```bash
Command 'atc' not found, but can be installed with:
sudo apt install bsdgames
```

显然，`atc` 命令的目录未被正确加载。根据文
章[基础环境配置](https://gitee.com/caoliang0601/samples/blob/master/cplusplus/environment/prepare_ENV/README_300_CN.md)中
的介绍，在运行转化前执行命令或通过修改 `.bashrc` 文件添加环境变量，即可解决该问
题。

此时，转化过程仍然不成功，在测试中，提示错误

```bash
ModuleNotFoundError: No module named 'te.platform'
```

<!-- cSpell:words CANN -->

参考其他与该报错相同或不同的贴文，推测这一问题与算子包兼容性有关系。访问
[MindStudio 下载页面](https://www.hiascend.com/zh/software/mindstudio/download)，
换用 2021/04/27 发布的 `2.0.0 (release)` 版本 MindStudio，以及与之相对应的
[CANN 算子包](https://www.hiascend.com/software/cann/commercial)，即实现成功转
化，得到 `.om` 模型。

```bash
...
ATC run success, welcome to the next use.
```

> 华为对算子包的版本号进行了重构，因此其处在极为混乱的状况，`2.0.0 (release)` 版
> 本 MindStudio 虽然要求的算子包为 `3.2.0`，即原 `20.2.0` 版本，但实测 `3.3.0`
> 版本亦可用。
