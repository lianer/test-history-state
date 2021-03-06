# historyState

通过 useHistoryState 可以将数据状态记录在浏览器历史记录实体中，以便下次回退到该历史记录的时候可以恢复之前的数据和状态

## Situation

在 SPA 架构中，我们希望在用户回退到之前的页面时，可以恢复之前的数据和状态，而不是重新加载页面。

严格来讲，如果用户是通过浏览器的 `前进/后退` 操作发生的页面跳转（history.back/forward/go 同理），我们应该恢复用户之前产生的数据；而如果用户是通过正常的链接跳转过来的，那这个页面应该被当作是一次全新的访问，不应该恢复用户之前产生的数据。

而市面上几乎所有的数据存储方案，都是基于域名的、全局的、或者永久的，无法做到跟随着浏览器的历史记录的变化而变化，此项目的核心目的就在于解决此问题。

通过 `DEMO` 可以查看效果，在有缓存的情况下，列表页的 `地区`、`页码`、`列表数据`、`滚动高度` 都会被存储下来，在用户回退到列表页的时候，能够瞬间恢复这些数据，用户可以继续下一步的操作。

## Feature

1. 该数据存储方案是页面级的，跟随着浏览器历史记录实体
2. 当历史记录堆栈的指针发生变化的时候也会随之变化
3. 当标签页关闭的时候也会自动释放内存
4. 储存的数据以哈希表 key/value 的形式存在，浏览器历史记录实体中储存的是哈希表的拷贝
5. 如果通过 pushState 生成一个新的历史记录实体，那么这个实体是不会包含历史数据的

## 使用方法

参考 `List.tsx` 中的 `useHistoryState`

## 核心方法

见 `historyState.ts`
