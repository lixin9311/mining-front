import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1Component } from './card1.component';

describe('Card1Component', () => {
    let component: Card1Component;
    let fixture: ComponentFixture<Card1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Card1Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Card1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
