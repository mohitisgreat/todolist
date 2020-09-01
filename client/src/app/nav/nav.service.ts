import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class NavService {
  navTitle: Subject<string> = new Subject<string>();
}
