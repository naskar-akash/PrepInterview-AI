import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import create_app
import app.routes.interview_routes as interview_routes


def test_upload_route_accepts_resume_field(monkeypatch):
    app = create_app()
    app.config.update(TESTING=True)

    def fake_upload_resume(file, user_id):
        assert file is not None
        return {"ok": True}, 200

    monkeypatch.setattr(interview_routes, "upload_resume", fake_upload_resume)

    client = app.test_client()
    data = {
        "resume": (io.BytesIO(b"fake pdf"), "resume.pdf"),
    }

    response = client.post(
        "/interview/upload",
        data=data,
        content_type="multipart/form-data",
    )

    assert response.status_code == 200
