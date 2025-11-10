import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Table = ({ myContribution }) => {
  const columns = [
    { key: "id", name: "SL NO" },
    { key: "title", name: "Title" },
    { key: "category", name: "Category" },
    { key: "amount", name: "Amount" },
    { key: "date", name: "Date" },
  ];

  const rows = myContribution.map((item, index) => ({
    id: index + 1,
    title: item.title,
    category: item.category,
    amount: item.amount,
    date: item.date,
  }));

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("My Contributions", 14, 10);

    const tableColumn = columns.map((col) => col.name);
    const tableRows = rows.map((row) => columns.map((col) => row[col.key]));

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("My Contribution.pdf");
  };

  return (
    <div className="h-full relative">
      <DataGrid columns={columns} rows={rows} />
      <button
        onClick={exportToPDF}
        className="btn btn-outline btn-primary mt-2 w-50 absolute right-0"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Table;
