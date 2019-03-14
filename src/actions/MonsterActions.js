export function fetchMonsters() {
    return (dispatch) => {
      dispatch({ type: 'LOADING_MONSTERS' })
      return fetch('/monsters')
        .then(res => res.json())
        .then(resJSON => {
          dispatch({ type: 'LOADED_MONSTERS', payload: resJSON })
        }).catch(err => console.log(err))
    }
}
