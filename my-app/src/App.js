import "./App.css";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useState } from "react";
import Spinner from "./Spinner";
const App = () => {
  const [userInput, setUserInput] = useState("");
  const [searchKey, setsearchKey] = useState("User");
  const [data, setData] = useState({});
  const [loader, setloader] = useState(false);

  const updateState = (e) => {
    let key = e.target.value;
    setUserInput(key);
  };
  const onValueChange = (e) => {
    setsearchKey(e.target.value);
    setData({});
    setUserInput("");
    setloader(false);
  };
  const getData = () => {
    setloader(true);
    let url = "";
    if (searchKey === "Organization") {
      url = `https://api.github.com/search/users?q=${userInput}+type:org`;
    } else {
      url = `https://api.github.com/search/users?q=${userInput}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((result) => returnData(result));
  };
  const returnData = (result) => {
    if (result) {
      setData(result);
      setloader(false);
    }
  };
  return (
    <>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <div className="form-bg ">
            <Form>
              <FormGroup>
                <Label className="formLabel">{`Searching by ${searchKey}`}</Label>
                <Input
                  type="text"
                  name={userInput}
                  value={userInput}
                  onChange={(e) => updateState(e)}
                  placeholder={`Enter ${searchKey.toLocaleLowerCase()} name`}
                />
              </FormGroup>
              <div>
                <label className="formLabel">
                  <input
                    className="radioprop"
                    type="radio"
                    value="User"
                    checked={searchKey === "User"}
                    onChange={onValueChange}
                  />
                  User
                </label>
                <label className="formLabel">
                  <input
                    className="radioprop"
                    type="radio"
                    value="Organization"
                    checked={searchKey === "Organization"}
                    onChange={onValueChange}
                  />
                  Organization
                </label>
              </div>
              {userInput !== "" && searchKey !== "" && (
                <Button onClick={() => getData()} color="primary">
                  Search
                </Button>
              )}
            </Form>
          </div>
          {Object.keys(data)?.length > 0 && data?.items?.length > 0 ? (
            <div className="form-bg formLabel ">
              <h4>{`${searchKey}s (${data.items?.length ?? 0}) `}</h4>
              <div className={data?.items?.length > 10 ? "scrollSetter" : ""}>
                {data?.items?.map((i, k) => (
                  <p key={`items${k}`}>
                    <div className="itemBlock">
                      <span>Login </span> : <span>{i.login} </span> <br></br>
                      <span>ID </span> : <span>{i.id} </span><br></br>
                      <span>Node Id </span> : <span>{i.node_id} </span>
                    </div>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="form-bg formLabel">
              {loader ? (
                <div className="pos-center">
                  <Spinner />
                  Searching...
                </div>
              ) : (
                !loader && <p>No data to show</p>
              )}
            </div>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default App;
