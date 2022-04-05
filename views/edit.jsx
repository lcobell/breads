const React = require("react");
const Default = require("./layouts/Default");

function Edit(props) {
  return (
    <Default>
      <h2>Edit a bread</h2>
      <form action={`/breads/${props.id}?_method=PUT`} method="POST">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={props.bread.name}
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          defaultValue={props.bread.image}
        />
        <label htmlFor="hasGluten">Has Gluten?</label>
        <input
          type="checkbox"
          name="hasGluten"
          id="hasGluten"
          defaultChecked={props.bread.hasGluten}
        />
        <br />
        <input type="submit" />
      </form>
    </Default>
  );
}

module.exports = Edit;
