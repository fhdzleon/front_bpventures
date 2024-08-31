import { permission } from "process";

const deliverableMock = [
  {
    id: 1,
    archivo: "documento_proyecto.pdf",
    fechaCreacion: "2024-08-28",
    autor: "Juan Pérez",
    permission: [
      {
        id: 1,
        name: "edit",
        userId: 2,
        created: "2024-02-10",
        updatedAt: "2024-02-10",
        permissionType: {
          id: 1,
          name: "edit",
        },
      },
    ],
  },
  {
    id: 2,
    archivo: "presentacion.pptx",
    fechaCreacion: "2024-08-27",
    autor: "Ana Gómez",
  },
  {
    id: 3,
    archivo: "plan_de_trabajo.docx",
    fechaCreacion: "2024-08-26",
    autor: "Carlos Hernández",
  },
  {
    id: 4,
    archivo: "resumen_ejecutivo.pdf",
    fechaCreacion: "2024-08-25",
    autor: "Luis Martínez",
  },
  {
    id: 5,
    archivo: "diagrama_flujo.vsdx",
    fechaCreacion: "2024-08-24",
    autor: "María López",
  },
  {
    id: 6,
    archivo: "manual_usuario.docx",
    fechaCreacion: "2024-08-23",
    autor: "Raúl Fernández",
  },
  {
    id: 7,
    archivo: "propuesta_comercial.xlsx",
    fechaCreacion: "2024-08-22",
    autor: "Carmen Rodríguez",
  },
  {
    id: 8,
    archivo: "infografia_marketing.png",
    fechaCreacion: "2024-08-21",
    autor: "Jorge Gutiérrez",
  },
  {
    id: 9,
    archivo: "informe_financiero.xlsx",
    fechaCreacion: "2024-08-20",
    autor: "Sofía Jiménez",
  },
  {
    id: 10,
    archivo: "calendario_actividades.xlsx",
    fechaCreacion: "2024-08-19",
    autor: "Miguel Castro",
  },
  {
    id: 11,
    archivo: "contrato_servicios.pdf",
    fechaCreacion: "2024-08-18",
    autor: "Laura Mendoza",
  },
  {
    id: 12,
    archivo: "esquema_arquitectura.vsdx",
    fechaCreacion: "2024-08-17",
    autor: "Fernando Silva",
  },
  {
    id: 13,
    archivo: "reporte_ventas.xlsx",
    fechaCreacion: "2024-08-16",
    autor: "Patricia Ruiz",
  },
  {
    id: 14,
    archivo: "memo_interno.docx",
    fechaCreacion: "2024-08-15",
    autor: "Gabriel Torres",
  },
  {
    id: 15,
    archivo: "estrategia_seo.docx",
    fechaCreacion: "2024-08-14",
    autor: "Elena Vargas",
  },
  {
    id: 16,
    archivo: "minuta_reunion.docx",
    fechaCreacion: "2024-08-13",
    autor: "Héctor Navarro",
  },
  {
    id: 17,
    archivo: "analisis_riesgos.pdf",
    fechaCreacion: "2024-08-12",
    autor: "Valeria Ríos",
  },
  {
    id: 18,
    archivo: "presupuesto_evento.xlsx",
    fechaCreacion: "2024-08-11",
    autor: "David Peña",
  },
];

export default deliverableMock;
