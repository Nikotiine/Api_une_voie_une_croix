import { Factory, Seeder } from 'typeorm-seeding';
import { ApproachType } from '../entity/ApproachType.entity';
import { Equipment } from '../entity/Equipment.entity';
import { Engagement } from '../entity/Engagement.entity';
import { Exposition } from '../entity/Exposition.entity';
import { Level } from '../entity/Level.entity';
import { RouteProfile } from '../entity/RouteProfile.entity';
import { RockType } from '../entity/RockType.entity';
import { Region } from '../entity/Region.entity';
import { Department } from '../entity/Department.entity';

export default class AppSeedSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    //************************ INFORMATION GENERALE***************

    // ***APPROACH TYPE***
    const approachList = [
      'En montée legere',
      'En montée raide',
      'Sur du plat',
      'En descente legere',
      'En descente raide',
    ];
    for (const approach of approachList) {
      await factory(ApproachType)()
        .map(async (a) => {
          a.label = approach;
          return a;
        })
        .create();
    }

    // ***EQUIPMENT TYPE***
    const equipments = [
      'Plaquettes',
      'Plaquettes maison',
      'Broches',
      'Spit de 10',
      'Spit de 8',
      'Non equipé (trad)',
    ];
    for (const equipment of equipments) {
      await factory(Equipment)()
        .map(async (e) => {
          e.label = equipment;
          return e;
        })
        .create();
    }

    // ***ENGAGEMENT TYPE***
    const engagements = ['Rapproché', 'Normal', 'Engagé', 'Exposé'];
    for (const engagement of engagements) {
      await factory(Engagement)()
        .map(async (en) => {
          en.label = engagement;
          return en;
        })
        .create();
    }

    // ***EXPOSITIONS***
    const expositions = [
      'Nord',
      'Nord-Est',
      'Nord-Ouest',
      'Sud',
      'Sud-Est',
      'Sud-Ouest',
      'Est',
      'Ouest',
    ];
    for (const exposition of expositions) {
      await factory(Exposition)()
        .map(async (ex) => {
          ex.label = exposition;
          return ex;
        })
        .create();
    }

    // ***LEVELS***
    const levelType = ['A', 'A+', 'B', 'B+', 'C', 'C+'];
    for (let i = 3; i < 10; i++) {
      for (const level of levelType) {
        await factory(Level)()
          .map(async (l) => {
            l.label = i + level;
            return l;
          })
          .create();
      }
    }
    // ***ROUTE PROFILES***
    const profiles = ['Dalle', 'Vertical', 'Devers', 'Surplomb'];
    for (const profile of profiles) {
      await factory(RouteProfile)()
        .map(async (p) => {
          p.label = profile;
          return p;
        })
        .create();
    }

    // ***ROCK TYPES***
    const rockTypes = [
      'Calcaire',
      'Gneiss',
      'Granit',
      'Molasse',
      'Quartzite',
      'Gres',
      'Gres rose',
      'Marbre',
    ];
    for (const rockType of rockTypes) {
      await factory(RockType)()
        .map(async (r) => {
          r.label = rockType;
          return r;
        })
        .create();
    }

    // ***DEPARTMENT***
    const deptAura = [
      { label: 'Ain', lat: 5.2217169, lng: 46.2025304 },
      { label: 'Allier', lat: 45.0409261, lng: 3.8842893999999433 },
      { label: 'Ardèche', lat: 44.7333, lng: 4.6 },
      { label: 'Cantal', lat: 45.2168006897, lng: 2.33257007599 },
      { label: 'Drôme', lat: 44.7311896, lng: 5.2266675 },
      { label: 'Isère', lat: 45.16667, lng: 5.71667 },
      { label: 'Loire', lat: 45.4445457458, lng: 4.38566684723 },
      { label: 'Haute-Loire', lat: 45.040926, lng: 3.8842893999999433 },
      { label: 'Puy-de-Dôme', lat: 45.7708015442, lng: 3.08554005623 },
      { label: 'Rhône', lat: 45.764043, lng: 4.835659 },
      { label: 'Savoie', lat: 45.564601, lng: 5.917781 },
      { label: 'Haute-Savoie', lat: 45.899247, lng: 6.129384 },
    ];
    const deptBourgogne = [
      { label: "Côte-d'Or", lat: 47.316669, lng: 5.01667 },
      { label: 'Doubs', lat: 47.2335615, lng: 6.0221315 },
      { label: 'Jura', lat: 46.762475, lng: 5.6729159 },
      { label: 'Nièvre', lat: 47.2381708, lng: 3.5294522 },
      { label: 'Haute-Saône', lat: 47.6201961, lng: 6.1598029 },
      { label: 'Saône-et-Loire', lat: 46.9498085, lng: 4.3010204 },
      { label: 'Yonne', lat: 47.8652728, lng: 3.6079823 },
      { label: 'Territoire de Belfort', lat: 47.5946573, lng: 6.9207716 },
    ];

    const regions = [
      {
        label: 'Auvergne-Rhône-Alpes',
        depart: deptAura,
      },
      {
        label: 'Bourgogne-Franche-Comté',
        depart: deptBourgogne,
      },
    ];
    for (const region of regions) {
      await factory(Region)()
        .map(async (r) => {
          r.name = region.label;
          const d: Department[] = [];
          for (const department of region.depart) {
            const create = await factory(Department)()
              .map(async (e) => {
                e.name = department.label;
                e.lat = department.lat;
                e.lng = department.lng;
                return e;
              })
              .create();
            d.push(create);
          }
          r.departments = d;
          return r;
        })
        .create();
    }
    /* await factory(Region)()
      .map(async (r) => {
        r.name = aura.label;
        const d: Department[] = [];
        for (const department of aura.depart) {
          const create = await factory(Department)()
            .map(async (e) => {
              e.name = department.label;
              e.lat = department.lat;
              e.lng = department.lng;
              return e;
            })
            .create();
          d.push(create);
        }
        r.departments = d;
        return r;
      })
      .create();*/
    // ***REGIONS***
  }
}
