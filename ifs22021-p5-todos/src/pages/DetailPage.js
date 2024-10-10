import { getTodo } from "../utils/data-todos";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";

function DetailPage() {
  const { id } = useParams();
  const todo = getTodo(id);

  if (!todo) {
    return <p>Tidak ada catatan</p>;
  }

  const badgeStatus = todo.is_finished ? (
    <span className="badge bg-success">Selesai</span>
  ) : (
    <span className="badge bg-warning">Proses</span>
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">{todo.title}</h1>
      <div className="text-center mb-4">
        {badgeStatus}
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <Icon.Clock className="me-2" />
            <span>Dibuat pada: {formatDate(todo.created_at)}</span>
          </div>
          {todo.is_finished && (
            <div className="d-flex align-items-center mb-3">
              <Icon.Check className="me-2" />
              <span>
                Selesai pada: <span className="text-success">{formatDate(todo.updated_at)}</span>
              </span>
            </div>
          )}
          <p>{todo.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
