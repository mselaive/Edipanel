// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const Login = () => {
  const navigate = useNavigate();
  const[password, setPassword] = useState("");
  const[username, setUsername] = useState("");


  const { t } = useTranslation("global");
  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(result => {

        console.log(result.token)

        if(result.token){
          localStorage.setItem('token', result.token);
          /* Timeout para el token por definir*/
          /*setTimeout(() => {
            localStorage.removeItem('token');
          }, 2 * 60 * 1000); // 2 minutos en milisegundos*/ 
          navigate('/panel')
        }else{
          console.log("no hay token")
        }
      })
      .catch(error => {
        console.error(error);
      });


  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>{t("auth.box-title")}</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={t('auth.box-email')}
                    type="email"
                    autoComplete="new-email"
                    onChange={(e)=>{setUsername(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={t('auth.box-pass')}
                    type="password"
                    autoComplete="new-password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">{t("auth.box-remember")}</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" onClick={handdleLogin} color="primary" type="button">
                  {t("auth.box-login")}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{t("auth.forgot-auth")}</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{t("auth.register-auth")}</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
