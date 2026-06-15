from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://deepmed:deepmed@localhost:5432/deepmedfusion"
    s3_endpoint_url: str = "http://localhost:9000"
    s3_access_key: str = "deepmed"
    s3_secret_key: str = "deepmedsecret"
    s3_bucket: str = "medical-imaging"
    api_cors_origins: str = "http://localhost:5173"
    model_device: str = "cpu"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.api_cors_origins.split(",") if origin.strip()]


settings = Settings()
