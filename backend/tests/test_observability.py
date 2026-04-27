def test_health_returns_ok(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_metrics_endpoint_exposed(client):
    # Trigger at least one request so counters are non-empty
    client.get("/health")

    resp = client.get("/metrics")
    assert resp.status_code == 200
    body = resp.text
    # Prometheus exposition format markers
    assert "# HELP" in body
    assert "# TYPE" in body
    # Default instrumentator metric
    assert "http_requests_total" in body


def test_metrics_excludes_metrics_handler(client):
    # Hit /metrics a few times — its own handler must be excluded from labels
    for _ in range(3):
        client.get("/metrics")
    resp = client.get("/metrics")
    assert resp.status_code == 200
    assert 'handler="/metrics"' not in resp.text
