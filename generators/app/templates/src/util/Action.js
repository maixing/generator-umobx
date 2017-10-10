import Rx from 'rx';
//订阅模型
const action = new Rx.Subject();

//消息日志打印
// action.subscribe(console.log.bind(console, '[ACTION]'));

export default action;

//发送
// action.onNext({
//     name: 'CLICKED_ITEM_DATA',
//     data: {
//         name: 'zhangmaixing',
//         age: 30,
//     },
// });

//监听
// this.obsClickedItemData = action
//     .filter(a => a.name === 'CLICKED_ITEM_DATA')
//     .map(a => a.data)
//     .subscribe(clickedItemData => console.log(clickedItemData.name));

//释放监听
//this.obsClickedItemData.dispose();
