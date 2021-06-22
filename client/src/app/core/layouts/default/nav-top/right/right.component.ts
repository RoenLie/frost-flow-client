import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from "@core/services/auth.service";
import { Observable } from 'rxjs';
import { DefaultLayoutService } from '../../default.service';

@Component( {
  selector: 'app-nav-top-right',
  templateUrl: './right.component.html',
  styleUrls: [ './right.component.scss' ]
} )
export class RightComponent implements OnInit {
  constructor (
    public authService: AuthService,
    public defaultLayoutService: DefaultLayoutService
  ) { }

  ngOnInit(): void { }
}
