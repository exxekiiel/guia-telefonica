export default function FloorFilter({ floors, selectedFloor, setSelectedFloor }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por piso">
      <button
        onClick={() => setSelectedFloor(null)}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
          !selectedFloor
            ? 'bg-manzana text-white shadow-md shadow-manzana/30'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-manzana dark:hover:border-manzana-light hover:text-manzana dark:hover:text-manzana-light'
        }`}
        aria-pressed={!selectedFloor}
      >
        Todos
      </button>
      {floors.map((piso) => (
        <button
          key={piso}
          onClick={() => setSelectedFloor(selectedFloor === piso ? null : piso)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFloor === piso
              ? 'bg-turquesa text-white shadow-md shadow-turquesa/30'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-turquesa dark:hover:border-turquesa-light hover:text-turquesa dark:hover:text-turquesa-light'
          }`}
          aria-pressed={selectedFloor === piso}
        >
           {piso}
        </button>
      ))}
    </div>
  )
}
