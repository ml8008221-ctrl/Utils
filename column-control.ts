/**
 * https://blog.3sharecorp.com/implementing-a-container-component-column-control-in-aem-spa-react
 * https://bitbucket.org/3SHARE/column-control-in-aem-spa/src/main/
 */

import { Component, Input } from '@angular/core';
import { ComponentMapping, Container, CoreContainerItem, CoreContainerProperties, CoreContainerState, withStandardBaseCssClass } from '@adobe/aem-core-components-angular-spa';

@Component({
  selector: 'app-column-control',
  template: `
    <div [ngClass]="columnControlProps">
      <ng-container *ngIf="!isEmpty">
        <div [ngClass]="['cmp-columncontrol', 'cmp-columncontrol' + columnLayout]">
          <div *ngFor="let column of renderFirstNColumns(numOfColumnsToRender); let i = index" [ngClass]="['cmp-columncontrol__column', 'cmp-columncontrol__column--' + i]">
            {{ column }}
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class ColumnControlComponent extends Container<ColumnControlProps, CoreContainerState> {
  @Input() columnLayout: string;
  @Input() cqItems: { [key: string]: CoreContainerItem };

  readonly ColumnLayoutToNumOfColumnsMap: { [key: string]: number } = {
    '--50': 2,
    '--75-25': 2,
    '--25-75': 2,
    '--33': 3,
    '--25': 4
  };

  get numOfColumnsToRender(): number {
    return this.ColumnLayoutToNumOfColumnsMap[this.columnLayout];
  }

  get isEmpty(): boolean {
    return !this.columnLayout;
  }

  get columnControlProps(): { [key: string]: any } {
    const attrs = this.containerProps;
    attrs.className = `${attrs.className} cmp-columncontrol`;
    attrs['data-cmp-is'] = 'columncontrol';
    return attrs;
  }

  renderFirstNColumns(numOfColumns: number): CoreContainerItem[] {
    return this.childComponents.slice(0, numOfColumns);
  }
}