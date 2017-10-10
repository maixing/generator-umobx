/**
 * Created by maixing on 2017/4/11.
 */
import React from 'react';
export default class UltraIcon extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const coloricon = this.props.color?this.props.color:'#fff';
        return (
            <i className={'fa ' + 'fa-' + this.props.type} aria-hidden="true"
               style={{padding: this.props.padding, fontSize: this.props.fontsize,color:coloricon}}>
            </i>
        )
    }
}