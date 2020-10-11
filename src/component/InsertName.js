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

  const addNewInput = (set, value, valueToBeAdded) => {
    set([...value, valueToBeAdded ? valueToBeAdded : ""]);
  };

  const calculateAverage = () => {
    const tmpList = [...list];
    console.log(tmpList);
    tmpList.forEach((item) => {
      const { value } = item;
      const totalShared = name.length;
      item.average = (Number(value) / totalShared).toFixed(2);
      item.shared = mapNameToValue();
    });
    setList(tmpList);
  };

  const mapNameToValue = () => {
    return name.map((item) => ({ name: item, isShared: true }));
  };

  const uncheckName = (name, uncheckIndex) => {
    const tmpList = [...list];
    tmpList.forEach((item, index) => {
      const { value, shared } = item;
      if (uncheckIndex === index) {
        shared.forEach((item) =>
          item.name === name ? (item.isShared = !item.isShared) : item.isShared
        );
        const sharedList = shared.filter((item) => item.isShared);
        const totalShared = sharedList.length === 0 ? 1 : sharedList.length;
        item.average = (Number(value) / totalShared).toFixed(2);
        item.shared = shared;
      }
    });
    setList(tmpList);
  };

  const handleNameChange = (e, index) => {
    const { value } = e.target;
    const newValue = [...name];
    newValue[index] = value;
    setName(newValue);
  };

  const handleListItemChange = (e, index, inputName) => {
    const { value } = e.target;
    const newValue = [...list];
    newValue[index][inputName] = value;
    setList(newValue);
    calculateAverage();
  };

  const handleRemove = (indexToRemove, set, target) => {
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
                <input
                  value={item}
                  onChange={(e) => handleNameChange(e, index)}
                />
              </div>

              <button onClick={() => handleRemove(index, setName, name)} tabIndex={-1}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => addNewInput(setName, name)}>Add new name</button>
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
                  onChange={(e) => handleListItemChange(e, index, "name")}
                />
                <input
                  value={value}
                  type="number"
                  onChange={(e) => handleListItemChange(e, index, "value")}
                />
                <button onClick={() => handleRemove(index, setList, list)}>
                  remove
                </button>
                <span>{average}</span>
              </div>
              <div>
                {shared.map((item) => {
                  const { name, isShared } = item;
                  return (
                    <span
                      style={{
                        color: isShared ? "#000" : "red",
                        marginRight: 10,
                      }}
                      onClick={() => uncheckName(name, uncheckIndex)}
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
        onClick={() =>
          addNewInput(setList, list, {
            name: "",
            value: 0,
            average: 0,
            shared: mapNameToValue(),
          })
        }
      >
        Add new item
      </button>
    </div>
  );
}

export default InsertName;
