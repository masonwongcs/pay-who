import * as React from "react";
import { useEffect, useState } from "react";
import { NameWrapper, ReceiptWrapper } from "./Styled";
import { FaPlusSquare, FaTrash } from "react-icons/fa";
import Colors from "../Colors";
import { withRouter } from "react-router";
import queryString from "querystring";
import { addNewInput, convertFromBase64, convertToBase64 } from "./utils";
import ReceiptRow from "./ReceiptRow";

function InsertName({ location, history }) {
  const [name, setName] = useState(undefined);
  const [list, setList] = useState(undefined);

  useEffect(() => {
    const { n, l } = queryString.parse(location.search.replace(/^\?/, ""));
    if (!!n && !!l) {
      const name = convertFromBase64(n);
      const list = convertFromBase64(l);
      setName(JSON.parse(name));
      setList(JSON.parse(list));
      return;
    }
    setName([""]);
    setList([{ item: "", total: 0 }]);
  }, []);

  useEffect(() => {
    history.push({
      pathname: "",
      search: `?n=${convertToBase64(JSON.stringify(name))}&l=${convertToBase64(
        JSON.stringify(list)
      )}`,
    });
  }, [name, list]);

  const handleNameChange = (index) => (e) => {
    const { value } = e.target;

    const newValue = [...name];
    newValue[index] = value;
    setName(newValue);
  };

  const handleRemove = (indexToRemove, set, target) => () => {
    set(target.filter((item, index) => index !== indexToRemove));
  };
  const updateTotal = (index, data) => {
    setList((oldList) => oldList.map((o, i) => (i === index ? data : o)));
  };

  return !!name && !!list ? (
    <div>
      <NameWrapper>
        <h3>Who is sharing</h3>
        <ul>
          {name.map((item, index) => (
            <li key={`name-${index}`} style={{ color: Colors[index] }}>
              {/*<FaUserAlt />*/}
              <div className="input-wrapper">
                <input value={item} onChange={handleNameChange(index)} />
              </div>

              <button
                onClick={handleRemove(index, setName, name)}
                tabIndex={-1}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <button className="add-btn" onClick={addNewInput(setName, name)}>
          Add new new person
        </button>
      </NameWrapper>

      <ReceiptWrapper>
        <h3 className="title">Receipt</h3>
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th className="center">TOTAL</th>
              <th className="shared">SHARED</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <ReceiptRow
                key={`list-${index}`}
                names={name.filter((n) => !!n)}
                handleRemove={handleRemove(index, setList, list)}
                updateTotal={updateTotal.bind(null, index)}
                initialValue={item}
              />
            ))}
            <tr>
              <td colSpan={3}>
                <button
                  className="add-new-item"
                  onClick={addNewInput(setList, list, 0)}
                >
                  <FaPlusSquare /> Add new item
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total amount</td>
              <td>{list.reduce((acc, item) => acc + Number(item.total), 0)}</td>
            </tr>
          </tfoot>
        </table>
      </ReceiptWrapper>
    </div>
  ) : null;
}

export default withRouter(InsertName);
