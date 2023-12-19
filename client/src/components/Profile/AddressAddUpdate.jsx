function AddressAddUpdate() {
  function handleSubmit() {}
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full px-8 flex flex-col">
        <label htmlFor="address" className="font-Nova text-[20px] font-bold text-gray-600 mt-4 mb-2 capitalize" >Enter Your Address</label>
        <textarea name="address" id="address" rows="5" className="border-2 border-gray-500 resize-none rounded-md p-2"></textarea>
        <p className="font-Roboto text-[13px] mt-1">Apartment, suite, unit, building, floor, street address, etc.</p>

        <hr className="my-3" />

        <label htmlFor="address" className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize inline-block" >Country</label>
        <input type="text" />
      </form>
    </div>
  );
}

export default AddressAddUpdate;
