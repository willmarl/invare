import "./Custom.css";

function Custom() {
  return (
    <section className="custom home__section">
      <h2 className="custom__title">
        Easily Add Custom Modules to Your Arduino Inventory
      </h2>
      <p className="custom__desc">
        Expand your inventory by adding custom Arduino modules effortlessly.
        Simply fill out a quick form to include any module you own.
      </p>
      <div className="custom__cards">
        <div className="custom__card">
          <h3 className="custom__card-title">Add Modules</h3>
          <p className="custom__card-desc">
            Input module details like name, type, and quantity in seconds.
          </p>
        </div>
        <div className="custom__card">
          <h3 className="custom__card-title">Save Changes</h3>
          <p className="custom__card-desc">
            Your custom modules are now part of your inventory!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Custom;
