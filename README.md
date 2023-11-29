# live2d && vrm

可展示两种模型 live2d 和 vrm

该项目旨在配合后端实现AI虚拟主播，现在正在重构当中

目前已实现 live2d 以及 vrm 的支持

重构将：
    更换编程的思想，采用面向对象式的编程
    更换框架 从vue3 更换到 react (最早先为vue2),更换UI库，尝试原子化css
    由js 变为ts
    对于以前魔鬼整合的代码会自己编写(vrm)
    寻找更加合适的口型算法
    对于使用的live2d 库，将fork 进行添加口型的同步的代码支持
    ws 方面将添加ping pong
    对于前端的设置页，计划采用标签页间通信来实现一些共享数据状态
    ...


     



```shell
安装依赖
yarn

运行
yarn dev

打包
yarn build
```