---
title: Markdown学习
date: 2020-06-19
tags: [markdown]
permalink: markdown/
---

<!-- markdownlint-disable emphasis-style -->

是时候学一点Markdown了！

## 为什么要学习Markdown

其实很早之前就有学Markdown和LaTeX的想法。今年年初由于疫情，不得不在电脑上完成作
业，起初是采用Surface Pen手写，效果也还不错，后来体验了Word自带的Unicode Math公
式编辑器，瞬间爱不释手，这效率可比手写高多了（并且我也特别享受这样的创作过程），
于是又进而萌生了学习Markdown和LaTeX的想法。一拖再拖到暑假，来认认真真地学习一下
吧！

Markdown有很多的优点，以下是一些简单的介绍。

<!-- more -->

### 简洁明了，专注内容的编辑体验

我们平时若想要写一些文字，会采用什么软件呢？利用记事本写txt纯文本文档的话，虽然
更为通用，可以在几乎任何地方阅读，但似乎可支持的内容太少，不能插入代码块、图片、
标题分级、文本的加粗、斜体、下划线等。采用Word来编写的话，首先文件的外观就与平台
有关，有时候我们好不容易排好了版，但是在其他版本的软件上瞬间变得一团糟。更严重的
是，排版本身就将作者大量的注意力里从文字当中吸引走，而不能专注于写作本身，Word的
排版真是门技术活，段前段后缩进、段落距离行距离等我就花了很长时间研究……

这样一来，Markdown的优点就凸显出来。Markdown更专注于内容本身，而文档的样式、版式
则是由阅读器来决定的（所以使用Markdown进行写作可以很方便地换主题）。这样一来，写
作者可以更专注于自己正在撰写的文字，也有更多的编辑器和阅读器选择自由度。Markdown
也可以插入公式、图片、代码块、标题、序号等，内容很丰富。个人认为，但就写作体验而
言，Markdown应该是目前最佳的一种格式吧。

### 对其他平台的友好兼容

正如前述，因为Markdown本身不包含版式等信息，它也能够很好地兼容各个平台。CSDN、知
乎、简书等博客性质的网站都可以支持导入.md文件转化为文章，正是利用了Markdown的这
一特性。其实这次我开始学习Markdown的直接诱因就是想在知乎上写一些文章（；´д｀）ゞ

### Markdown的缺点

Markdown也有很多缺点，首先就是Markdown需要记住一些独特的语法，但是这也不算很难。
其次，Markdown插入图片是以链接的方式，而非直接将图片存储在文件之中，这就会导致迁
移文件或者图片目录时可能引起图片显示的异常。虽然有一些方法解决这一问题，但总的来
讲的确不太方便。此外，Markdown的公式编辑功能缺乏图形界面的辅助，使用体验不如Word
的公式编辑器。还有很多的小毛病，比如段首缩进等，对中文的适配等……

（但是，许多功能可以通过软件的辅助来实现）

## 两款Markdown编辑器

开始Markdown写作其实只需要下载相应的软件就好了，之所以说需要配置环境，是因为使用
Markdown在某些情况下需要很多插件（或者Markdown本身就是通过插件实现的）。Markdown
的可选编辑器有很多，不再赘述，只提一下我自己用的两款。

### Typora

#### Typora的优点

- UI很美观，赏心悦目
- 支持多种显示主题，如Dark Mode，GitHub样式等，在网上可以找到更多拓展
- 支持多个平台
- 操作简单，不需要什么额外的配置
- 支持打字机模式、专注模式等，提升写作体验
- 具有直观的GUI操作，例如直接右键单击进行样式设定，插入图片等功能
- 可以通过快捷键改变文字样式，正如在Word中一样
- 支持字数统计等
- 总而言之就是更像是一个用来写作的工具了

#### Typora的缺点

- 可自定义性较差
- 不支持Markdown的format提醒
- 采用将源代码区与显示区合为一体的交互方式，在我看来是一种劣势，但是也许有的用户
  会喜欢吧

![将鼠标移动到对应位置即显示出源代码](https://gitee.com/sghuang19/assets/raw/master/img/20200619165741_Typora.gif)

### VSCode

VSCode原生支持Markdown文件的预览和语法高亮，通过插件可以在VSCode中实现Markdown的
更多功能，能少安装一些软件，何乐而不为呢？

#### VSCode的优点

- VSCode的界面不用我说了，漂亮的惊人，主题样式也很多，每次写代码都是享受
- 高度可自定义，只需要编辑.json配置文件
- 支持语法高亮
- 通过插件可以大大增强功能，支持对于Markdown格式标准化的提醒，甚至可以进行自动修
  正等

![VSCode截图](https://raw.githubusercontent.com/SamuelHuang2019/FigureBed/master/img/20200619103454_VSCode.png)

#### VSCode的缺点

- 没有图形界面（指对于Markdown的编辑而言），大部分操作都需要通过原生的Markdown代
  码实现
- 需要配置环境，还是有点复杂的（一开始我对.json不是很熟悉，研究了很久才掌握）

总而言之，VSCode更像是一款针对程序员的Markdown工具，而Typora则适合没有那么强的计
算机基础的小白，它也适合利用Markdown进行纯粹的创作的人群。萝卜白菜各有所爱，总之
我是两个都装了。

## 在VSCode上编写Markdown

首先从微软的官网下载安装VSCode。

打开你所需要的文件夹，新建Markdown文件。

![新建MD文件](https://raw.githubusercontent.com/SamuelHuang2019/FigureBed/master/img/20200619104337_VSCode_newMDFile.gif)

打开这个文件，就可以看到源代码的编写界面。通过快捷键`Ctrl`+`Shift```+`V`启动预览
页面，再把窗口拖拽到另一侧，就成了我们熟悉的Markdown编写界面了。

![Markdown预览窗口](https://raw.githubusercontent.com/SamuelHuang2019/FigureBed/master/img/20200619105131_VSCode_Window.gif)

### VSCode中Markdown环境的简单配置

介绍几个小插件，各有各自的功能。

#### markdownlint

正如其名字里带着的lint，这款插件主要用于实现Markdown写作的格式规范化和自动更正，
具体可以访
问[markdownlint规则说明文档](https://github.com/DavidAnson/markdownlint/blob/v0.20.3/doc/Rules.md#md012)。

如果源代码中有与markdownlint的规则相抵触之处，则会出现黄色波浪线，将鼠标移至其
上，就可以在弹出的选项卡里转到对应规则的描述。有些规则是我们不太想要的，或者需要
做一些微调。以规则`MD024`为例，这一规则要求不能出现内容相同的标题。但是实际使用
中，只要从属在不同的上一级标题之下，似乎即使标题相同也不会引起什么误解。

在官方说明文档中我们看到，这一规则对应的名称`Aliases`为`no-duplicate-heading`或
者`no-duplicate-header`，参数为`siblings-only`或者`allow_different_nesting`，默
认值都为`false`，接下来进行修改。

使用快捷键`F1`或`Ctrl`+`Shift`+`P`打开VSCode主命令行，直接搜索`settings.json`，
根据自己的需要打开全局或者工作区的配置文件。在配置文件中，添加markdownlint的配置
语句：

```json
{
  "markdownlint.config": {
    "no-duplicate-heading": { "allow_different_nesting": true }
  }
}
```

> Remark：只需要更改一个参数就行，注意语法，尤其是那个逗号。

这样一来就可以实现允许相同内容的标题出现，但仅在不同的上一级标题之下

此外markdownlint还支持更高级的规则自定义，具体参阅GitHub上
的[markdownlint自定义规则说明文档](https://github.com/DavidAnson/markdownlint/blob/v0.20.3/doc/CustomRules.md)

markdownlint提供的另一个功能是根据这些规则自动格式化文档。要启用同样是
在`settings.json`文件中添加语句：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
  }
}
```

> Remark：这一段代码相当于对VSCode主体的设置，所以是写在`settings.json`文件的主
> 体中，而非前述`"markdownlint.config"`括号内。

完成这个修改之后，每次保存文件都会自动格式化，还挺方便的。这个格式化过程也是可以
回退的。

#### Markdown Preview Enhanced

顾名思义，这个插件就是用来增强VSCode中Markdown文件的预览体验的。VSCode默认的预览
窗口是跟随VSCode全局的主题设置，所以有时候可能暗色模式不太适合阅读文件。

安装Markdown Preview Enhanced插件，在源代码窗口右键单击，即可选择在右侧打开预览
窗口。不仅可以实现阅读的增强，以及目录的显示，在预览窗口中右键单击还可导出
Markdown文件为其他格式，实在方便。

![Markdown Preview Enhanced](https://raw.githubusercontent.com/sghuang19/assets/master/img/20200619135214_MarkdownPreviewEnhanced.png)

此外，Markdown Preview Enhanced也具有额外的图片功能！在后文会提到。

#### Markdown All in One

正如名称所言，这款插件集合了很多功能，包括快捷键、公式、格式转换、目录和脚注等。
具体的目前我都还没有摸得很清楚，有待研究。

最为方便的功能就是快捷键，下文中会提到关于文本样式的设定，如加粗、斜体等，在没有
插件的情况下就必须通过标记符号来实现，还是比较复杂，而安装了Markdown All in One
后便可以直接使用快捷键，正如在Word中进行编辑一样。当然，值得注意的是，这会覆盖一
些VSCode自身的快捷键。

![Ctrl+B实现加粗](https://gitee.com/sghuang19/assets/raw/master/img/20200619173318_Shortcuts.gif)

#### vscode-pandoc

这款轻量插件实现了将Markdown文件转换为某些格式，没有GUI，通过命令行操作。

#### PicGo

大名鼎鼎的Markdown图片辅助工具，VSCode有可用的插件，基于PicGo Core实现，所以没有
GUI。我觉得为什么不直接用PicGo软件本体呢？关于PicGo在“图片”一节中会提到更多。

## Markdown的语法

用简明的方式整理一些基本的Markdown语言，需要更详细的解读可以去参照官方文档或者其
他的文章。

> Remark：大部分HTML语法可以直接在Markdown中使用，但是markdownlint中的规
> 则`MD033`要求不在Markdown中直接使用HTML语法，而是使用“纯粹”的Markdown语言。如
> 果对于黄色波浪线感到反感，可以通过前述的类似方法设定允许使用的HTML语法元素。

### 文本

输入文本就代表文本

换行符只相当于空格，段落是通过一个空行来标记

`#`标记各级标题，井号的数量标记标题的等级

段首空格并不代表缩进，但是四个空格会代表一个制表符（即`Tab`键）

使用单星号包围文字以表示斜体，如`*文字*`显示为*文字*

> Remark：部分编辑器中斜体也可以用单下划线`_`包围来表示

使用双星号包围文字以表示加粗，如`**文字**`显示为**文字**

使用三星号包围文字以表示加粗斜体，如`***文字***`显示为**_文字_**

使用双波浪线包围文字以表示删除线，如`~~文字~~`显示为~~文字~~

使用等号包围文字以实现高亮，如`==文字==`显示为==文字==

使用HTML中的语法来实现下划线，如`<u>文字</u>`显示为<u>文字</u>

使用`^`包围来表示上标，如`e^x^`显示为e^x^

使用`~`包围来表示上标，如`a~n~`显示为a~n~

其他的样式可以通过数学公式来实现，例如`$\overline{文字}$`显示为$\overline{文字}$

Markdown支持输入HTML转义字符

### 代码块

段首使用四个空格或者一个制表符即进入代码块模式

也可以在段落前与段落后各加上三个反引号（即键盘左上角的波浪线）` ``` `以开启代码
块。在第一串三反引号之后加上代码的类型，即可实现语法高亮。

例：

{% code markdown %}

```json
{ "editor.codeActionsOnSave": { "source.fixAll.markdownlint": true } }
```

{% endcode %}

> Remark：以上代码块中最后的`\`是为了不让Markdown将其前面的` ``` `识别为代码块的
> 结束，没有别的含义

其显示效果即为前文提到的配置`settings.json`文件时所引用的代码块样式

> Remark：正确的转义反引号`` ` ``的方法并非使用反斜杠，而是使用双反引号及空格将
> 反引号围起来，即
>
> ```markdown
> `` ` ``
> ```
>
> 这将显示为一个代码块内的单反引号

行内代码块，既可以通过三反引号前后包围，也可以通过单反引号前后包围。

### 链接

不现实为特定文字的链接： `<https://www.bilibili.com>`将显示
为<https://www.bilibili.com>

显示为特定文字的链接： `[Bilibili](https://www.bilibili.com)`将显示
为[Bilibili](https://www.bilibili.com)

### 图片

与显示为特定文字的链接相似，只是在之前加上一个叹号`!`，其后更改为图片的地址。既
可以是网络地址，也可以是计算机上的绝对路径，也可以是相对于.md文件的相对路径。

插入图片是Markdown的一大揪心之处，一般通过“图床”来实现，详见后文。

### 公式

Markdown中的数学输入和LaTeX其实很像

偷懒放个别的文
章：[Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962)

（视编写环境而定，可能语法和功能上有些出入）

简要提一下我从Unicode Math转到LaTeX的心得：大部分地方还是相同的，只是要更加注意
用`{}`来对不同的元素进行组合，公式要有首尾的标记，以及不能够再直接`/`然后敲空格
来输入分数了……

### 分割线

在一行输入三个及以上的`*`或`-`都可以起到分割的作用，哪怕它们之间有空格。

### 表格

```markdown
| 姓名 | 性别 |   年龄 |
| :--: | :--- | -----: |
| 张三 | 未知 | 约30岁 |
| 李四 | 男   | 约20岁 |
```

将显示为

|     姓名      | 性别 |     年龄 |
| :-----------: | :--- | -------: |
| 法外狂徒·张三 | 未知 |   约30岁 |
|     李四      | 男   | 20岁左右 |

通过`|`来划分每一列，而构成表格的要素则是第二行的一串符号（这一行代码是必须
的）。其实很直观很好理解，`:-:`代表居中，`:-`代表左对齐，`-:`代表右对齐，从这个
示例表格的样式里也可以观察出来。

### 列表

使用`-`开启无序列表，注意必须要有这个空格使用`1.`，即数字加英文句点和空格来开启
有序列表，空格也是必须的

## 怎样存图片

这个问题相当复杂，也很重要，关于图床的话题单独写一篇文章吧。（希望我能尽快填坑）

<!-- cSpell:ignore imgur -->

> Remark：“图床”的英文并非是"Figure Bed"，也跟"bed"没有关系Remark：此前提到的
> Markdown Preview Enhanced插件支持imgur，SM.MS，七牛这几款图床

## 其他参考文档

这些文档都很有价值，可以一看（每次上网搜文档都极其感激博主们）

- [在Markdown语言中，如何实现段首空格的显示？](https://www.zhihu.com/question/21420126)
- [PicGo+GitHub图床，让Markdown飞](https://juejin.im/entry/5c4ec5aaf265da614420689f)
- [Markdown 语法说明 (简体中文版)](https://www.appinn.com/markdown/)
- [我的 gitee 图床，自动上传、压缩、获取图片 url](https://juejin.im/post/5dd92cddf265da7dcb76aafb)（真
  的很羡慕，我试了，没成功，还是再多多学习下吧）
- [Gitee图床+PicGo+Typora便捷在博客中使用图片](https://www.cnblogs.com/focksor/p/12402471.html)
- [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962)
- [markdown中公式编辑教程](https://www.jianshu.com/p/25f0139637b7)
