
class StorageManager {
  private _key: string;
  private _type: ("session" | "local") = "local";

  public constructor(props: { key: string, type: ("session" | "local") }) {
    this._key = props.key
    this._type = props.type
  }

  public save = (data: any): any => {
    sessionStorage.setItem(this._key, JSON.stringify(data))
    let val = sessionStorage.getItem(this._key) ?? ""
    return JSON.parse(val)
  }

  public clear = () => {
    sessionStorage.removeItem(this._key)
  }

  public get = (): null | any => {
    let val = sessionStorage.getItem(this._key)
    if(val === null) return null
    return JSON.parse(val)
  }

}

export default StorageManager