import * as React from "react";
import { useEffect, useState } from "react";
import { NameWrapper } from "./Styled";
import { FaUserAlt, FaTrash } from "react-icons/fa";
import Colors from "../Colors";

function InsertName() {
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
        <h3>Insert the names</h3>
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
        <button onClick={addNewInput(setName, name)}>Add new name</button>
      </NameWrapper>

      <h3>Insert insert the list</h3>
      <ul>
        {list.map((item, index) => {
          const { name, value, average, shared } = item;
          const uncheckIndex = index;
          return (
            <li key={`list-${index}`}>
              <div>
                <input
                  value={name}
                  type="text"
                  onChange={handleListItemChange(index, "name")}
                />
                <input
                  value={value}
                  type="number"
                  onChange={handleListItemChange(index, "value")}
                />
                <button onClick={handleRemove(index, setList, list)}>
                  remove
                </button>
                <span>{average}</span>
              </div>
              <div>
                {shared.map((item, index) => {
                  const { name, isShared } = item;
                  return (
                    <span
                      key={`shared-${index}`}
                      style={{
                        color: isShared ? "#000" : "red",
                        marginRight: 10,
                      }}
                      onClick={uncheckName(name, uncheckIndex)}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <button
        onClick={addNewInput(setList, list, {
          name: "",
          value: 0,
          average: 0,
          shared: mapNameToValue(),
        })}
      >
        Add new item
      </button>
    </div>
  );
}

export default InsertName;
