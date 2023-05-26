import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import FixCustomHeaderColumn from './fixCustomHeader';

@Component({
  name: 'TooltipColumn',
})
export default class TooltipColumn extends FixCustomHeaderColumn {
    @Prop({ default: '' }) tooltip!: string

    getHTML(line: string) {
      return line.replaceAll(/style_[\w\d-:;]*_/g, '');
    }

    getLineStyle(line: string) {
      let style_str = 'height: 1em;';
      if (line.startsWith('style_')) {
        style_str += line.slice(line.indexOf('_') + 1, line.lastIndexOf('_'));
      }
      return style_str;
    }

    renderCustomHeader(h: any, scope: any) {
      let referenceSlot: any = this.label;
      if (this.$scopedSlots.reference) {
        referenceSlot = this.$scopedSlots.reference({ column: this.column });
      }
      const textAlign: any = { 'text-align': this.align || 'left' };
      const iconStyle: any = {
        top: '-7px',
        right: '-7px',
        transform: 'rotate(45deg)',
        'font-size': '18px',
        color: '#0188fb',
      };
      const renderHeader = this.$scopedSlots.header;
      const popoverSlots = {
        reference: (_props: any) => {
          return <p style={textAlign}>
                    <span class="cell" style="padding: 0 !important;">
                        {referenceSlot}
                    </span>
                    <i class="el-icon-caret-top absolute tips-style" style={ iconStyle }></i>
                </p>;
        },
        default: () => {
          const tooltip_content = (this.tooltip || '').split('br').map((line, index) => {
            return <p style={this.getLineStyle(line)} class={ index ? 'mt5' : '' }>{this.getHTML(line)}</p>;
          });
          return tooltip_content;
        },
      };
      const header = this.tooltip
        ? <el-popover
                placement="top"
                trigger="hover"
                content={this.tooltip}
                open-delay={this.openDelay}
                scopedSlots={popoverSlots}
                transition={this.transition} >
            </el-popover>
        : this.label;
      return renderHeader ? renderHeader(scope) : header;
    }
}
