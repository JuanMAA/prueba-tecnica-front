import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TareaDTO } from "../api/dto/tarea.dto";
import { Tareas } from "../microservices/Tarea";

const { Option } = Select;
const { Title } = Typography;

export default function MantenedorTareaComponent() {
  const [formTerminal] = Form.useForm();
  const [idTarea, setidTarea] = useState(null as any);
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if(query.get("id_tarea")){
      setidTarea(query.get("id_tarea"))
    }else{
      setidTarea(null)
      formTerminal.resetFields();
    }
  }, [history.location]);

  useEffect(() => {
    if (idTarea) {
      Tareas.getTareaById(idTarea).then((result) => {
        if (result.error) {
          notification["error"]({
            message: "Error",
            description: "Error al crear tarea",
            placement: "topRight",
            duration: 2,
          });
        } else {
          formTerminal.setFieldsValue(result.data);
        }
      });
    }
  }, [idTarea]);

  const onFinish = (formData: TareaDTO) => {
    if (idTarea === null) {
      Tareas.createTarea(formData).then((result) => {
        if (result.error) {
          notification["error"]({
            message: "Error",
            description: "Error al crear tarea",
            placement: "topRight",
            duration: 2,
          });
        } else {
          notification["success"]({
            message: "Correcto",
            description: "Tarea creada",
            placement: "topRight",
            duration: 2,
          });
          history.push(`/listar/`);
        }
      });
    } else {
      Tareas.updateTarea(parseInt(idTarea), formData).then((result) => {
        if (result.error) {
          notification["error"]({
            message: "Error",
            description: "Error al actualizar tarea",
            placement: "topRight",
            duration: 1000,
          });
        } else {
          notification["success"]({
            message: "Correcto",
            description: "Tarea actualizada",
            placement: "topRight",
            duration: 1000,
          });
          history.push(`/listar/`);
        }
      });
    }
  };

  return (
    <>
      <Form
        form={formTerminal}
        onFinish={onFinish}
        name="form-terminal"
        layout="vertical"
      >
        <Row>
          <Col xs={0} md={7} />
          <Col xs={24} md={10}>
            <Row>
              <Col xs={24} style={{ paddingTop: 100 }}>
                <Title level={3}>{ idTarea ? "Editar" : "Crear" } Tarea</Title>

                <Divider />
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Descripcion"
                  name="descripcion"
                  rules={[{ required: true }]}
                >
                  <Input maxLength={100} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Vigente"
                  name="vigente"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value={true}>Lista</Option>
                    <Option value={false}>Por hacer</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item style={{ paddingTop: 20 }}>
                  <Button block type="primary" htmlType="submit">
                  { idTarea ? "Editar" : "Crear" } Tarea
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={0} md={7} />
        </Row>
      </Form>
    </>
  );
}
