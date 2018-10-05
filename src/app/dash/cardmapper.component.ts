
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CardTemplateBaseComponent } from './card-templates/card-template-base';
import { Card1Component } from './card-templates/card1/card1.component';
import { Card2Component } from './card-templates/card2/card2.component';
import { Card3Component } from './card-templates/card3/card3.component';

@Component({
    selector: 'app-cardmapper',
    templateUrl: './cardmapper.component.html'
})

export class CardmapperComponent implements OnInit {

    @Input() data: any;
    @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;
    readonly templateMapper = {
        cardStyle1: Card1Component,
        cardStyle2: Card2Component,
        cardStyle3: Card3Component
    };

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponentForCardType(this.data.cardType));
        const viewContainerRef = this.container;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<CardTemplateBaseComponent>componentRef.instance).data = this.data;
    }
    private getComponentForCardType(cardType) {
        return this.templateMapper[cardType];
    }
}
