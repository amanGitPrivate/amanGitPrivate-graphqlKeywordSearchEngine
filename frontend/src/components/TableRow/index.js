import React, { useState } from "react";
import "./index.css";

const TableRow = ({ columnName, keyWordObject, modifyKeywordObject }) => {
  // state to show add keyword option
  const [showAddKeyWord, toggleAddKeyWord] = useState(false);
  // state to add a new keyword
  const [newKeyWord, updateKeyWord] = useState("");

  const showAddKeyWordInput = () => {
    toggleAddKeyWord(!showAddKeyWord);
  };

  const addKeyWordToList = () => {
    // logic to add keywords to list
    const keyWordObjectVar = Object.assign({},keyWordObject);
    keyWordObjectVar[columnName].push(newKeyWord);
    toggleAddKeyWord(!showAddKeyWord);
    modifyKeywordObject(keyWordObjectVar);
    //empty keyword name to disable the button
    updateKeyWord("");
  };

  const removeCategory = () => {
    // logic to delete keywords category  
    const keyWordObjectVar = Object.assign({},keyWordObject);
    delete keyWordObjectVar[columnName];
    modifyKeywordObject(keyWordObjectVar);
  };

  const removeKeyWord = (index) => {
    // logic to delete keywords category
    const keyWordObjectVar = Object.assign({},keyWordObject);
    keyWordObjectVar[columnName].splice(index, 1);
    modifyKeywordObject(keyWordObjectVar);
  };

  return (
    <tr className="table-row">
      <td>{columnName}</td>
      <td className="keywords-list">
        <div className="keyword-button-container">
          {keyWordObject[columnName].map((keyword, index) => (
            <span className="keywords" key={index.toString()}>
              {keyword}
              <button className="remove-keyword" onClick={() => removeKeyWord(index)}>x</button>
            </span>
          ))}
          <button
            className="show-keyword-option"
            onClick={() => showAddKeyWordInput()}
          >
            { !showAddKeyWord ? '+' : 'x' }
          </button>
          {showAddKeyWord && (
            <div className="input-keywordtype">
              <input
                placeholder="Add Keywords"
                className="input-keywords"
                type="text"
                onChange={({ target: { value } }) => updateKeyWord(value)}
              />
              <button
                disabled={!newKeyWord.length}
                className="add-keyword"
                onClick={() => addKeyWordToList()}
              >
                Add Keywords
              </button>
            </div>
          )}
        </div>
      </td>
      <td>
        <button className="delete-keyword" onClick={() => removeCategory()}>Delete Category</button>
       </td>   
    </tr>
  );
};

export default TableRow;
