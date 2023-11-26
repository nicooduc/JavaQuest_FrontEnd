import {Component, OnInit} from "@angular/core";
import {Link} from "models/links.model"

@Component({
  selector: "epf-navbar", templateUrl: "./navbar.component.html", styleUrls: ["./navbar.component.scss"],
})

export class NavbarComponent implements OnInit {
  links: Link[] = [];

  ngOnInit() {
    // this.links.push({name: "Histoire", href: "story"});
    // this.links.push({name: "Stats", href: "stats"});
    // this.links.push({name: "Combat", href: "fight"});
  }
}
