import {
  Button,
  Col,
  Divider,
  notification,
  Row,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TareaDTO } from "../api/dto/tarea.dto";
import { Tareas } from "../microservices/Tarea";
const { Title } = Typography;

export default function ListarTarea() {
  const [listaTareas, setListaTareas] = useState([] as TareaDTO[]);
  const history = useHistory();

  useEffect(() => {
    loadTareas();
  }, [history.location]);

  const columns = [
    {
      title: "vigente",
      dataIndex: "vigente",
      render: (vigente: boolean) => <>{vigente ? "Finalizada" : "Activa"}</>,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Action",
      key: "action",
      render: (tarea: any) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                history.push(`/mantenedor?id_tarea=${tarea.idTarea}`);
              }}
            >
              Editar
            </Button>
            <Button
              onClick={() => {
                Tareas.updateTarea(tarea.idTarea, {
                  descripcion: tarea.descripcion,
                  vigente: !tarea.vigente,
                }).then((result) => {
                  if (result.error) {
                    notification["error"]({
                      message: "Error",
                      description: "Error al actualizar",
                      placement: "topRight",
                      duration: 2,
                    });
                  } else {
                    notification["success"]({
                      message: "Correcto",
                      description: "Tarea actualizada correctamente",
                      placement: "topRight",
                      duration: 2,
                    });
                    loadTareas();
                  }
                });
              }}
              type="primary"
            >
              {tarea.vigente ? "Finalizada" : "Activa"}
            </Button>
          </>
        );
      },
    },
  ];

  const loadTareas = () => {
    Tareas.getTareas().then((result) => {
      if (result.error) {
        notification["error"]({
          message: "Error",
          description: "Error al listar tareas",
          placement: "topRight",
          duration: 2,
        });
      } else {
        setListaTareas(result.data);
      }
    });
  };

  return (
    <>
      <Row>
        <Col xs={0} md={7} />
        <Col xs={24} md={10}>
          <Title style={{ paddingTop: 100 }} level={3}>
            Listado de Tareas
          </Title>
          <Divider />
          <Table columns={columns} dataSource={listaTareas} />
        </Col>
        <Col xs={0} md={7} />
      </Row>
    </>
  );
}
