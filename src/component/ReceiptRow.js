import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Colors from "../Colors";

const ReceiptRow = ({ handleRemove, names, updateTotal, initialValue }) => {
  const [total, setTotal] = useState(0);
  const [name, setName] = useState(initialValue.item || "");
  const [value, setValue] = useState(initialValue.total || 0);
  const [shared, setShared] = useState(
    names.map((name) => ({ name, isShared: true }))
  );
  useEffect(() => {
    updateTotal({ item: name, total: Number(value) });
  }, [name, value]);
  useEffect(() => {
    const totalShared = shared.filter(({ isShared }) => isShared === true)
      .length;
    setTotal(Number(value) / (totalShared || 1));
  }, [value, shared]);
  useEffect(() => {
    setShared((oldShared) => {
      // length changed
      if (names.length > oldShared.length) {
        return names.map((name) => {
          const originalData = oldShared.find((o) => o.name === name);
          return originalData
            ? { name, isShared: originalData.isShared }
            : { name, isShared: true };
        });
      }
      // length changed
      if (names.length < oldShared.length) {
        return names
          .map((name) => oldShared.find((o) => o.name === name))
          .filter((o) => !!o);
      }
      // content changed
      return names
        .map((name, index) => {
          const originalData = oldShared.find((o, i) => index === i);
          return originalData
            ? {
                name,
                isShared: originalData.isShared,
              }
            : undefined;
        })
        .filter((o) => !!o);
    });
  }, [names]);
  const handleListItemChange = (method) => (e) => {
    method(e.target.value);
  };
  const uncheckName = (index) => {
    setShared((oldShared) =>
      oldShared.map((o, i) =>
        i !== index ? o : { ...o, isShared: !o.isShared }
      )
    );
  };
  return (
    <>
      <tr>
        <td>
          <input
            value={name}
            type="text"
            onChange={handleListItemChange(setName)}
          />
        </td>
        <td className="center">
          <input
            value={value}
            type="number"
            onChange={handleListItemChange(setValue)}
          />
          <button className="delete" onClick={handleRemove}>
            <FaTrash />
          </button>
        </td>
        <td className="shared">
          <span className="total">
            {`(${value} / ${
              shared.filter(({ isShared }) => isShared === true).length || 1
            }) = ${total.toFixed(2)}`}
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
                  className={`share-item ${isShared ? "" : "disabled"}`}
                  key={`shared-${index}`}
                  style={{
                    color: Colors[index],
                  }}
                  onClick={uncheckName.bind(null, index)}
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
};

export default ReceiptRow;
