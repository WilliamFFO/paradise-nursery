/** Foto de Wikimedia Commons (licencias Creative Commons) en un ancho estándar de miniatura. */
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=500`

// Catálogo de la tienda de demostración.
// Cada planta tiene un `id` estable que se usa como identidad en el carrito
// (y como `key` de React), de modo que el nombre visible puede cambiar sin
// romper el estado persistido.

export const categories = [
  {
    id: 'aire-fresco',
    name: 'Plantas de Aire Fresco',
    shortName: 'Aire fresco',
    description:
      'Especies de follaje abundante que llenan de frescura y verdor cualquier espacio interior.',
    icon: 'wind',
    plants: [
      {
        id: 'palma-areca',
        name: 'Palma de Areca',
        description: 'Palmera tropical de hojas arqueadas que aporta humedad al ambiente.',
        image: commons('散尾葵Dypsis_lutescens_20210511145013_05.jpg'),
        price: 32,
      },
      {
        id: 'hiedra-inglesa',
        name: 'Hiedra Inglesa',
        description: 'Trepadora elegante, ideal para macetas colgantes y estantes altos.',
        image: commons('Hedera_helix_Dover.jpg'),
        price: 18,
      },
      {
        id: 'planta-caucho',
        name: 'Planta de Caucho',
        description: 'Hojas grandes y brillantes que dan un toque escultural a la sala.',
        image: commons('Ficus_elastica_leaves_02.JPG'),
        price: 25,
      },
      {
        id: 'lengua-suegra',
        name: 'Lengua de Suegra',
        description: 'Muy resistente: tolera poca luz y riegos ocasionales.',
        image: commons('Snake_Plant_(Sansevieria_trifasciata_\'Laurentii\').jpg'),
        price: 24,
      },
      {
        id: 'palma-bambu',
        name: 'Palma de Bambú',
        description: 'Frescura tropical que crece bien con luz indirecta.',
        image: commons('Chamaedorea_seifrizii7.jpg'),
        price: 30,
      },
      {
        id: 'helecho-boston',
        name: 'Helecho de Boston',
        description: 'Frondas abundantes que agradecen la humedad y la luz filtrada.',
        image: commons('Boston_Fern_(2873392811).png'),
        price: 19,
      },
    ],
  },
  {
    id: 'aromaticas',
    name: 'Plantas Aromáticas',
    shortName: 'Aromáticas',
    description: 'Fragancias naturales para la cocina, el balcón o el borde de la ventana.',
    icon: 'sprout',
    plants: [
      {
        id: 'lavanda',
        name: 'Lavanda',
        description: 'Aroma relajante y flores violetas; prefiere mucha luz.',
        image: commons('Levanduľová farma, Trnava pri Laborci 24 Slovakia 20b.jpg'),
        price: 15,
      },
      {
        id: 'jazmin',
        name: 'Jazmín',
        description: 'Flores blancas de fragancia intensa, perfectas junto a una ventana.',
        image: commons('Jasminum officionale flowers, 74 Sunbury St Geebung IMGP2383.jpg'),
        price: 20,
      },
      {
        id: 'menta',
        name: 'Menta',
        description: 'Crecimiento rápido y hojas frescas para infusiones y cocina.',
        image: commons('Minze.jpg'),
        price: 10,
      },
      {
        id: 'romero',
        name: 'Romero',
        description: 'Aromática mediterránea, resistente y muy útil en la cocina.',
        image: commons('Rosemary_in_bloom.JPG'),
        price: 12,
      },
      {
        id: 'albahaca',
        name: 'Albahaca',
        description: 'Hojas fragantes, indispensables en la cocina; ama el sol.',
        image: commons('Ocimum_basilicum_8zz.jpg'),
        price: 9,
      },
      {
        id: 'eucalipto',
        name: 'Eucalipto',
        description: 'Follaje plateado con un aroma fresco y balsámico.',
        image: commons('Eucalyptus gundal leaves juvenile.jpg'),
        price: 22,
      },
    ],
  },
  {
    id: 'bajo-mantenimiento',
    name: 'Plantas de Bajo Mantenimiento',
    shortName: 'Bajo mantenimiento',
    description: 'Resistentes y agradecidas: perfectas si estás empezando a cuidar plantas.',
    icon: 'sun',
    plants: [
      {
        id: 'echeveria',
        name: 'Suculenta Echeveria',
        description: 'Roseta compacta que almacena agua en sus hojas carnosas.',
        image: commons('Echeveria_elegans_-_1.jpg'),
        price: 12,
      },
      {
        id: 'sansevieria-cilindrica',
        name: 'Sansevieria Cilíndrica',
        description: 'Hojas cilíndricas y erguidas; casi no necesita riego.',
        image: commons('Cylindrical snake plant.jpg'),
        price: 22,
      },
      {
        id: 'zamioculca',
        name: 'Zamioculca (ZZ)',
        description: 'Hojas lustrosas que soportan ambientes con poca luz.',
        image: commons('Zamioculcas_zamiifolia_1.jpg'),
        price: 28,
      },
      {
        id: 'pothos',
        name: 'Pothos',
        description: 'Colgante y muy adaptable; ideal para principiantes.',
        image: commons('Money_Plant_(Epipremnum_aureum)_4.jpg'),
        price: 16,
      },
      {
        id: 'cactus-san-pedro',
        name: 'Cactus San Pedro',
        description: 'Cactus columnar de crecimiento lento; pide sol y poco riego.',
        image: commons('Starr_070320-5799_Echinopsis_pachanoi.jpg'),
        price: 14,
      },
      {
        id: 'planta-arana',
        name: 'Planta Araña',
        description: 'Produce hijuelos fáciles de propagar y tolera descuidos.',
        image: commons('Hierbabuena_0611_Revised.jpg'),
        price: 13,
      },
    ],
  },
]

// Lista plana con el nombre corto de la categoría incluido en cada planta.
export const allPlants = categories.flatMap((category) =>
  category.plants.map((plant) => ({ ...plant, category: category.shortName })),
)

const plantsById = new Map(allPlants.map((plant) => [plant.id, plant]))

export function findPlant(id) {
  return plantsById.get(id)
}
