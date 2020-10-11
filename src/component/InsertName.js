import * as React from "react";
import { useEffect, useState } from "react";
import { NameWrapper, ReceiptWrapper } from "./Styled";
import { FaPlusSquare, FaTrash } from "react-icons/fa";
import Colors from "../Colors";
import { withRouter } from "react-router";
import { useHistory } from "react-router";
import queryString from "querystring";
import { convertFromBase64, convertToBase64, isEmpty } from "./utils";

function InsertName() {
  const history = useHistory();
  const [name, setName] = useState([""]);
  const [list, setList] = useState([
    {
      name: "",
      value: 0,
      average: 0,
      shared: [],
    },
  ]);

  useEffect(() => {
    calculateAverage();
  }, [name]);

  useEffect(() => {
    const qs = queryString.parse(window.location.search);
    if (!isEmpty(qs)) {
      const name = qs["?n"] && convertFromBase64(qs["?n"]);
      const list = qs["l"] && convertFromBase64(qs["l"]);
      setName(JSON.parse(name));
      setList(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    history.push({
      pathname: "",
      search: `?n=${convertToBase64(JSON.stringify(name))}&l=${convertToBase64(
        JSON.stringify(list)
      )}`,
    });
  }, [name, list]);

  const addNewInput = (set, value, valueToBeAdded) => () => {
    set([...value, valueToBeAdded ? valueToBeAdded : ""]);
  };

  const calculateAverage = () => {
    setList((oldList) =>
      oldList.map((item) => {
        const { value } = item;
        const totalShared = name.length;
        return {
          ...item,
          average: (Number(value) / totalShared).toFixed(2),
          shared: mapNameToValue(),
        };
      })
    );
  };

  const mapNameToValue = () => {
    return name.map((item) => ({ name: item, isShared: true }));
  };

  const uncheckName = (name, uncheckIndex) => () => {
    setList((oldList) =>
      oldList.map((item, index) => {
        const { value } = item;
        if (uncheckIndex === index) {
          const shared = item.shared.map((s) => ({
            ...s,
            isShared: s.name === name ? !s.isShared : s.isShared,
          }));
          const sharedList = shared.filter((item) => item.isShared);
          const totalShared = sharedList.length === 0 ? 1 : sharedList.length;
          return {
            ...item,
            shared,
            average: (Number(value) / totalShared).toFixed(2),
          };
        }
        return item;
      })
    );
  };

  const handleNameChange = (index) => (e) => {
    const { value } = e.target;

    const newValue = [...name];
    newValue[index] = value;
    setName(newValue);
  };

  const handleListItemChange = (index, inputName) => (e) => {
    const { value } = e.target;
    const newValue = [...list];
    newValue[index][inputName] = value;
    setList(newValue);
    calculateAverage();
  };

  const handleRemove = (indexToRemove, set, target) => () => {
    set(target.filter((item, index) => index !== indexToRemove));
  };

  return (
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
            {list.map((item, index) => {
              const { name, value, average, shared } = item;
              const uncheckIndex = index;
              return (
                <>
                  <tr key={`list-${index}`}>
                    <td>
                      <input
                        value={name}
                        type="text"
                        onChange={handleListItemChange(index, "name")}
                      />
                    </td>
                    <td className="center">
                      <input
                        value={value}
                        type="number"
                        onChange={handleListItemChange(index, "value")}
                      />
                      <button
                        className="delete"
                        onClick={handleRemove(index, setList, list)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="shared">
                      <span className="total">
                        {`(${value} / ${shared.length})\n = ${average}`}
                      </span>
                    </td>
                  </tr>
                  <tr className="shared-row">
                    <td colSpan={3}>
                      <div className="share-list">
                        {shared.map((item, index) => {
                          const { name, isShared } = item;
                          return (
                            <span
                              className={`share-item ${
                                isShared ? "" : "disabled"
                              }`}
                              key={`shared-${index}`}
                              style={{
                                color: Colors[index],
                              }}
                              onClick={uncheckName(name, uncheckIndex)}
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
            <tr>
              <td colSpan={3}>
                <button
                  className="add-new-item"
                  onClick={addNewInput(setList, list, {
                    name: "",
                    value: 0,
                    average: 0,
                    shared: mapNameToValue(),
                  })}
                >
                  <FaPlusSquare /> Add new item
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total amount</td>
              <td>
                {list.reduce((acc, item) => {
                  return acc + Number(item.value);
                }, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </ReceiptWrapper>
    </div>
  );
}

export default withRouter(InsertName);
