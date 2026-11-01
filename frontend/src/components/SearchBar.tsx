import { FormEvent, useState } from "react";
import { FilterType } from "../api";

interface Props {
  onFilter: (type: FilterType, value: string) => void;
}

export default function SearchBar({ onFilter }: Props) {
  const [values, setValues] = useState({ search: "", price: "", rating: "" });

  // סינון אחד בכל פעם: שאר השדות מתאפסים. שדה ריק מציג את כל המוצרים
  function run(type: "search" | "price" | "rating", e: FormEvent) {
    e.preventDefault();
    const value = values[type].trim();
    setValues({ search: "", price: "", rating: "", [type]: values[type] });
    onFilter(value ? type : "all", value);
  }

  function showAll() {
    setValues({ search: "", price: "", rating: "" });
    onFilter("all", "");
  }

  function change(type: "search" | "price" | "rating", value: string) {
    setValues({ ...values, [type]: value });
  }

  return (
    <section className="filters" aria-label="סינון מוצרים">
      <form className="glass" onSubmit={(e) => run("search", e)}>
        <label htmlFor="search">חיפוש לפי שם</label>
        <input id="search" value={values.search} onChange={(e) => change("search", e.target.value)} placeholder="jacket" />
        <button type="submit">חפש</button>
      </form>
      <form className="glass" onSubmit={(e) => run("price", e)}>
        <label htmlFor="price">מחיר מקסימלי</label>
        <input id="price" type="number" min="0" step="any" value={values.price} onChange={(e) => change("price", e.target.value)} placeholder="15" />
        <button type="submit">סנן</button>
      </form>
      <form className="glass" onSubmit={(e) => run("rating", e)}>
        <label htmlFor="rating">דירוג מינימלי (0–5)</label>
        <input id="rating" type="number" min="0" max="5" step="any" value={values.rating} onChange={(e) => change("rating", e.target.value)} placeholder="4.6" />
        <button type="submit">סנן</button>
      </form>
      <button type="button" className="all glass" onClick={showAll}>
        כל המוצרים
      </button>
    </section>
  );
}
