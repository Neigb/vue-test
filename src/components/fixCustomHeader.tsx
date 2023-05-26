import Vue from 'vue';
import { TableColumn } from 'element-ui';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseMoneyColumn from './BaseMoneyColumn.vue';

export function getPropByPath(obj: any, path: string, strict?: undefined) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}

export function defaultRenderCell(h: any, { row, column, $index }: any) {
  const property = column.property;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
}

export function treeCellPrefix(h: any, { row, treeNode, store }: any) {
  if (!treeNode) return null;
  const ele = [];
  const callback = function(e: { stopPropagation: () => void; }) {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(<span class="el-table__indent" style={{ 'padding-left': `${treeNode.indent}px` }}></span>);
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = ['el-table__expand-icon', treeNode.expanded ? 'el-table__expand-icon--expanded' : ''];
    let iconClasses = ['el-icon-arrow-right'];
    if (treeNode.loading) {
      iconClasses = ['el-icon-loading'];
    }
    ele.push(<div class={ expandClasses }
        on-click={ callback }>
        <i class={ iconClasses }></i>
        </div>);
  } else {
    ele.push(<span class="el-table__placeholder"></span>);
  }
  return ele;
}

@Component({
  name: 'FixCustomHeaderColumn',
  mixins: [TableColumn],
})
export default class FixCustomHeaderColumn extends Vue {
  // 排序方法
  @Prop({ default: false }) sortable?: string | boolean;

  // 列标签
  @Prop() label?: string

  // 过渡动画
  @Prop({ default: 'el-fade-in-linear' }) transition!: string

  // 打开延时
  @Prop({ default: 0 }) openDelay!: number

  // 自定义渲染时使用，不推荐使用
  @Prop() renderHeader?: Function

  // 标签位置
  @Prop({ default: 'left' }) align!: string

  // 列属性
  @Prop({ default: '' }) prop!: string

  column!: any;

  row: any;

  owner: any;

  setColumnRenders(column: any) {
    // renderHeader 属性不推荐使用。
    this.column = column;
    if (this.renderHeader) {
      console.warn('[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.');
    } else if (column.type !== 'selection') {
      column.renderHeader = this.renderCustomHeader;
    }

    let originRenderCell = column.renderCell;
    // TODO: 这里的实现调整
    if (column.type === 'expand') {
      // 对于展开行，renderCell 不允许配置的。在上一步中已经设置过，这里需要简单封装一下。
      column.renderCell = (h: any, data: any) => (<div class="cell">
            {originRenderCell(h, data)}
        </div>);
      this.owner.renderExpanded = (h: any, data: any) => {
        return this.$scopedSlots.default
          ? this.$scopedSlots.default(data)
          : this.$slots.default;
      };
    } else {
      originRenderCell = originRenderCell || defaultRenderCell;
      // 对 renderCell 进行包装
      column.renderCell = (h: any, data: { column: { realWidth: any; width: any; }, row: any }) => {
        let children = null;
        this.row = data.row;
        this.column = data.column;
        if (this.$scopedSlots.default) {
          children = this.$scopedSlots.default(data);
        } else {
          const render: any = this.$options.render?.bind(this);
          children = (TableColumn as any).render !== this.$options.render ? render(h, data) : originRenderCell(h, data);
        }
        const prefix = treeCellPrefix(h, data);
        const props = {
          class: 'cell',
          style: {},
        };
        if (column.showOverflowTooltip) {
          props.class += ' el-tooltip';
          props.style = { width: `${(data.column.realWidth || data.column.width) - 1}px` };
        }
        return (<div {...props}>
                {prefix}
                {children}
            </div>);
      };
    }
    return column;
  }

  renderCustomCell(h: any, data: any) {
    this.row = data.row;
    this.column = data.column;
    return this.$options.render?.bind(this);
  }


  renderCustomHeader(h: any, scope: any) {
    console.log(this.$scopedSlots);
    const renderHeader = this.$scopedSlots.header;
    return renderHeader ? renderHeader(scope) : this.column.label;
  }
}
