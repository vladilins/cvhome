import { Component, OnInit, OnDestroy } from "@angular/core";
import { SkillsService } from "./skills.service";
import { Skill } from "./skill.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"]
})
export class SkillsComponent implements OnInit, OnDestroy {
  // skills = [{ title: "HTML5" }, { title: "CSS3" }, { title: "JS" }];
  skills: Skill[] = [];
  private skillsSub: Subscription;
  constructor(public skillsService: SkillsService) {}

  ngOnInit() {
    this.skills = this.skillsService.getSkills();
    this.skillsSub = this.skillsService
      .getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.skills = skills;
      });
  }

  ngOnDestroy() {
    this.skillsSub.unsubscribe();
  }
}
