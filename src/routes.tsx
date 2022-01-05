import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutComponent from "./component/layout";
import MantenedorTareaComponent from "./component/mantenedor";
import ListarTareasComponent from "./component/listar";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <LayoutComponent>
            <>
              <Route path="/" exact component={ListarTareasComponent} />
              <Route path="/mantenedor" component={MantenedorTareaComponent} />
              <Route path="/listar" exact component={ListarTareasComponent} />
            </>
          </LayoutComponent>
        </Switch>
      </BrowserRouter>
    </>
  );
}
