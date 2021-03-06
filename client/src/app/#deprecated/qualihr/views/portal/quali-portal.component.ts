import { Component, OnInit } from '@angular/core';
import { AuthService } from "@core/services/auth.service";


@Component( {
  selector: 'app-quali-portal',
  templateUrl: './quali-portal.component.html',
  styleUrls: [ './quali-portal.component.scss' ],
} )
export class QualiPortalComponent implements OnInit {
  constructor ( public authService: AuthService ) { }

  ngOnInit(): void { }
}
