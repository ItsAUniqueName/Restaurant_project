import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTableComponent } from './admin-create-table.component';

describe('AdminCreateTableComponent', () => {
  let component: AdminCreateTableComponent;
  let fixture: ComponentFixture<AdminCreateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
