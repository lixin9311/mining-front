import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2Component } from './card2.component';

describe('Card1Component', () => {
    let component: Card2Component;
    let fixture: ComponentFixture<Card2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Card2Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Card2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
