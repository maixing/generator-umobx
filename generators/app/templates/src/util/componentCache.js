/**
 * Created by maixing on 2016/12/8.
 */
import React from 'react';
const map = new Map();
function init(){
}
function getCompoent(name,props){
  if(map.has(name)){
    return React.createElement(map.get(name), props);
  }
  return <div>not found component</div>
}
export {init,getCompoent};
