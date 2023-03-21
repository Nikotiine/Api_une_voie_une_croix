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
    const deptBretagne = [
      { label: "Côtes-d'Armor", lat: 48.51667, lng: -2.78333 },
      { label: 'Finistère', lat: 47.997542, lng: -4.097899 },
      { label: 'Ille-et-Vilaine', lat: 48.117266, lng: -1.6777926 },
      { label: 'Morbihan', lat: 47.8852929, lng: -2.9001865 },
    ];
    const deptCVL = [
      { label: 'Cher', lat: 47.083328, lng: 2.398782 },
      { label: 'Eure-et-Loir', lat: 48.5525242, lng: 1.1989814 },
      { label: 'Indre', lat: 46.810638, lng: 1.68746 },
      { label: 'Indre-et-Loire', lat: 47.383333, lng: 0.683333 },
      { label: 'Loir-et-Cher', lat: 47.5860921, lng: 1.3359475 },
      { label: 'Loiret', lat: 47.902964, lng: 1.90925 },
    ];
    const deptCorse = [
      { label: 'Corse-du-Sud', lat: 41.8102633, lng: 8.9245343 },
      { label: 'Haute-Corse', lat: 42.4097877, lng: 9.2785583 },
    ];

    const deptGE = [
      { label: 'Ardennes', lat: 49.7624642, lng: 4.6285053 },
      { label: 'Aube', lat: 49.033333, lng: 6.333333 },
      { label: 'Marne', lat: 48.958328, lng: 4.36667 },
      { label: 'Haute-Marne', lat: 48.1260968, lng: 5.1071322 },
      { label: 'Meurthe-et-Moselle', lat: 48.6896459, lng: 6.1737197 },
      { label: 'Meuse', lat: 49.082432, lng: 5.2824 },
      { label: 'Moselle', lat: 49.0983839, lng: 6.5527641 },
      { label: 'Bas-Rhin', lat: 48.6343172, lng: 7.5252938 },
      { label: 'Haut-Rhin', lat: 47.9315041, lng: 7.2441099 },
      { label: 'Vosges', lat: 48.1446427, lng: 6.3355935 },
    ];

    const deptHDF = [
      { label: 'Aisne', lat: 49.4769199, lng: 3.4417368 },
      { label: 'Nord', lat: 50.633333, lng: 3.066667 },
      { label: 'Oise', lat: 49.4214568, lng: 2.4146396 },
      { label: 'Pas-de-Calais', lat: 50.433333, lng: 2.833333 },
      { label: 'Somme', lat: 49.894067, lng: 2.295753 },
    ];
    const deptIDF = [
      { label: 'Paris', lat: 48.866667, lng: 2.333333 },
      { label: 'Seine-et-Marne', lat: 48.404676, lng: 2.70162 },
      { label: 'Yvelines', lat: 48.989323, lng: 1.714958 },
      { label: 'Essonne', lat: 48.633333, lng: 2.45 },
      { label: 'Hauts-de-Seine', lat: 48.869798, lng: 2.219033 },
      { label: 'Seine-Saint-Denis', lat: 48.9137455, lng: 2.4845729 },
      { label: 'Val-de-Marne', lat: 48.8385715, lng: 2.6925398 },
      { label: "Val-d'Oise", lat: 49.06159, lng: 2.158135 },
    ];
    const deptNormandie = [
      { label: 'Calvados', lat: 49.1213315, lng: -0.4330578 },
      { label: 'Eure', lat: 49.0270129, lng: 1.151361 },
      { label: 'Manche', lat: 50.134664, lng: -0.357056 },
      { label: 'Orne', lat: 48.432856, lng: 0.091266 },
      { label: 'Seine-Maritime', lat: 49.922992, lng: 1.077483 },
    ];
    const deptNA = [
      { label: 'Charente', lat: 45.7519958, lng: 0.1534761 },
      { label: 'Charente-Maritime', lat: 45.74949, lng: -0.7733188 },
      { label: 'Corrèze', lat: 45.372114, lng: 1.873739 },
      { label: 'Creuse', lat: 46.037763, lng: 2.062783 },
      { label: 'Dordogne', lat: 45.1469486, lng: 0.7572205 },
      { label: 'Gironde', lat: 44.849665, lng: -0.4502368 },
      { label: 'Landes', lat: 44.2, lng: 0.633333 },
      { label: 'Lot-et-Garonne', lat: 44.383331, lng: 0.31667 },
      { label: 'Pyrénées-Atlantiques', lat: 43.3269942, lng: -0.7532809 },
      { label: 'Deux-Sèvres', lat: 46.5926541, lng: -0.3962844 },
      { label: 'Vienne', lat: 46.580224, lng: 0.340375 },
      { label: 'Haute-Vienne', lat: 45.833619, lng: 1.261105 },
    ];
    const deptOccitanie = [
      { label: 'Ariège', lat: 42.932629, lng: 1.443469 },
      { label: 'Aude', lat: 43.0724667, lng: 2.3813621 },
      { label: 'Aveyron', lat: 44.100575, lng: 3.077801 },
      { label: 'Gard', lat: 44.133333, lng: 4.083333 },
      { label: 'Haute-Garonne', lat: 43.6, lng: 1.433333 },
      { label: 'Gers', lat: 43.6366479, lng: 0.4502368 },
      { label: 'Hérault', lat: 43.62505, lng: 3.862038 },
      { label: 'Lot', lat: 44.4475229, lng: 1.441989 },
      { label: 'Lozère', lat: 44.494203, lng: 3.581269 },
      { label: 'Hautes-Pyrénées', lat: 43.0193924, lng: 0.1494988 },
      { label: 'Pyrénées-Orientales', lat: 42.6012912, lng: 2.539603 },
      { label: 'Tarn', lat: 43.9264401, lng: 1.9881527 },
      { label: 'Tarn-et-Garonne', lat: 44.01667, lng: 1.3529599 },
    ];
    const deptPDL = [
      { label: 'Loire-Atlantique', lat: 47.2780468, lng: -1.8157647 },
      { label: 'Maine-et-Loire', lat: 47.2913545, lng: -0.4877852 },
      { label: 'Mayenne', lat: 48.3061239, lng: -0.620935 },
      { label: 'Sarthe', lat: 48.00611, lng: 0.199556 },
      { label: 'Vendée', lat: 46.6613966, lng: -1.4482662 },
    ];
    const deptPACA = [
      { label: 'Alpes-de-Haute-Provence', lat: 44.0778716, lng: 6.2375947 },
      { label: 'Hautes-Alpes', lat: 44.566667, lng: 6.083333 },
      { label: 'Alpes-Maritimes', lat: 43.7101728, lng: 7.2619532 },
      { label: 'Bouches-du-Rhône', lat: 43.3, lng: 5.4 },
      { label: 'Var', lat: 43.124228, lng: 5.928 },
      { label: 'Vaucluse', lat: 44.0565054, lng: 5.1432068 },
    ];
    // ***REGIONS***
    const regions = [
      {
        label: 'Auvergne-Rhône-Alpes',
        depart: deptAura,
      },
      {
        label: 'Bourgogne-Franche-Comté',
        depart: deptBourgogne,
      },
      {
        label: 'Bretagne',
        depart: deptBretagne,
      },
      {
        label: 'Centre-Val de Loire',
        depart: deptCVL,
      },
      {
        label: 'Corse',
        depart: deptCorse,
      },
      {
        label: 'Grand Est',
        depart: deptGE,
      },
      {
        label: 'Hauts-de-France',
        depart: deptHDF,
      },
      {
        label: 'Île-de-France',
        depart: deptIDF,
      },
      {
        label: 'Normandie',
        depart: deptNormandie,
      },
      {
        label: 'Nouvelle-Aquitaine',
        depart: deptNA,
      },
      {
        label: 'Occitanie',
        depart: deptOccitanie,
      },
      {
        label: 'Pays de la Loire',
        depart: deptPDL,
      },
      {
        label: "Provence-Alpes-Côte d'Azur",
        depart: deptPACA,
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
  }
}
