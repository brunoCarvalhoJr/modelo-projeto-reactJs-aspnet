using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "monitoramento");

            migrationBuilder.EnsureSchema(
                name: "historico");

            migrationBuilder.CreateTable(
                name: "aspnetroles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetroles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "aspnetusers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    cpj_cnpj = table.Column<string>(type: "character varying(14)", maxLength: 14, nullable: true),
                    desativado = table.Column<bool>(type: "boolean", nullable: false),
                    user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: true),
                    security_stamp = table.Column<string>(type: "text", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    access_failed_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetusers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cultura",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cultura", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "fazenda",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    numero = table.Column<string>(type: "text", nullable: true),
                    area = table.Column<double>(type: "double precision", nullable: false),
                    safra_tipo = table.Column<string>(type: "character varying(256)", nullable: false),
                    safra_ano_inicio = table.Column<int>(type: "integer", nullable: false),
                    safra_ano_fim = table.Column<int>(type: "integer", nullable: false),
                    the_geom = table.Column<Geometry>(type: "geometry", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_fazenda", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "historico_localizacao",
                schema: "historico",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    the_geom = table.Column<Geometry>(type: "geometry", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    codigo = table.Column<string>(type: "text", nullable: true),
                    area = table.Column<float>(type: "real", nullable: false),
                    cultura = table.Column<string>(type: "text", nullable: true),
                    talhao_id = table.Column<Guid>(type: "uuid", nullable: false),
                    fazenda_id = table.Column<Guid>(type: "uuid", nullable: false),
                    fazenda_nome = table.Column<string>(type: "text", nullable: true),
                    safra_nome = table.Column<string>(type: "text", nullable: true),
                    safra_tipo = table.Column<string>(type: "text", nullable: true),
                    safra_ano_inicio = table.Column<int>(type: "integer", nullable: false),
                    safra_ano_fim = table.Column<int>(type: "integer", nullable: false),
                    formulario_nome = table.Column<string>(type: "text", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_historico_localizacao", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ocorrencia_categoria",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    icone = table.Column<string>(type: "text", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_ocorrencia_categoria", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "aspnetroleclaims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<int>(type: "integer", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetroleclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_aspnetroleclaims_asp_net_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "aspnetroles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "aspnetuserclaims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetuserclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_aspnetuserclaims_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "aspnetusers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "aspnetuserlogins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    provider_key = table.Column<string>(type: "text", nullable: false),
                    provider_display_name = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetuserlogins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "fk_aspnetuserlogins_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "aspnetusers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "aspnetuserroles",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetuserroles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_aspnetuserroles_asp_net_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "aspnetroles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_aspnetuserroles_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "aspnetusers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "aspnetusertokens",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_aspnetusertokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "fk_aspnetusertokens_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "aspnetusers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "talhao",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    codigo = table.Column<string>(type: "text", nullable: true),
                    area = table.Column<float>(type: "real", nullable: false),
                    the_geom = table.Column<Geometry>(type: "geometry", nullable: true),
                    fazenda_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_talhao", x => x.id);
                    table.ForeignKey(
                        name: "fk_talhao_fazenda_fazenda_id",
                        column: x => x.fazenda_id,
                        principalSchema: "monitoramento",
                        principalTable: "fazenda",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usuario_fazenda",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    usuario_id = table.Column<int>(type: "integer", nullable: false),
                    fazenda_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_usuario_fazenda", x => x.id);
                    table.ForeignKey(
                        name: "fk_usuario_fazenda_fazenda_fazenda_id",
                        column: x => x.fazenda_id,
                        principalSchema: "monitoramento",
                        principalTable: "fazenda",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ocorrencia",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    ocorrencia_categoria_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_ocorrencia", x => x.id);
                    table.ForeignKey(
                        name: "fk_ocorrencia_ocorrencia_categoria_ocorrencia_categoria_id",
                        column: x => x.ocorrencia_categoria_id,
                        principalSchema: "monitoramento",
                        principalTable: "ocorrencia_categoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "localizacao",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    the_geom = table.Column<Geometry>(type: "geometry", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    talhao_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_localizacao", x => x.id);
                    table.ForeignKey(
                        name: "fk_localizacao_talhao_talhao_id",
                        column: x => x.talhao_id,
                        principalSchema: "monitoramento",
                        principalTable: "talhao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pergunta",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    obrigatorio = table.Column<bool>(type: "boolean", nullable: false),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    ocorrencia_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_pergunta", x => x.id);
                    table.ForeignKey(
                        name: "fk_pergunta_ocorrencia_ocorrencia_id",
                        column: x => x.ocorrencia_id,
                        principalSchema: "monitoramento",
                        principalTable: "ocorrencia",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "formulario",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    responder = table.Column<bool>(type: "boolean", nullable: false),
                    localizacao_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_formulario", x => x.id);
                    table.ForeignKey(
                        name: "fk_formulario_localizacao_localizacao_id",
                        column: x => x.localizacao_id,
                        principalSchema: "monitoramento",
                        principalTable: "localizacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "historico_formulario_item",
                schema: "historico",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    valor = table.Column<string>(type: "text", nullable: true),
                    pergunta_nome = table.Column<string>(type: "text", nullable: true),
                    localizacao_id = table.Column<Guid>(type: "uuid", nullable: false),
                    historico_localizacao_id = table.Column<Guid>(type: "uuid", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_historico_formulario_item", x => x.id);
                    table.ForeignKey(
                        name: "fk_historico_formulario_item_historico_localizacao_historico_l~",
                        column: x => x.historico_localizacao_id,
                        principalSchema: "historico",
                        principalTable: "historico_localizacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_historico_formulario_item_localizacao_localizacao_id",
                        column: x => x.localizacao_id,
                        principalSchema: "monitoramento",
                        principalTable: "localizacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "historico_foto",
                schema: "historico",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    uri = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    path = table.Column<string>(type: "text", nullable: true),
                    localizacao_id = table.Column<Guid>(type: "uuid", nullable: false),
                    historico_localizacao_id = table.Column<Guid>(type: "uuid", nullable: true),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_historico_foto", x => x.id);
                    table.ForeignKey(
                        name: "fk_historico_foto_historico_localizacao_historico_localizacao_~",
                        column: x => x.historico_localizacao_id,
                        principalSchema: "historico",
                        principalTable: "historico_localizacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_historico_foto_localizacao_localizacao_id",
                        column: x => x.localizacao_id,
                        principalSchema: "monitoramento",
                        principalTable: "localizacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "alternativa",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    pergunta_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_alternativa", x => x.id);
                    table.ForeignKey(
                        name: "fk_alternativa_pergunta_pergunta_id",
                        column: x => x.pergunta_id,
                        principalSchema: "monitoramento",
                        principalTable: "pergunta",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "formulario_item",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    valor = table.Column<string>(type: "text", nullable: true),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    pergunta_id = table.Column<Guid>(type: "uuid", nullable: false),
                    formulario_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_formulario_item", x => x.id);
                    table.ForeignKey(
                        name: "fk_formulario_item_formulario_formulario_id",
                        column: x => x.formulario_id,
                        principalSchema: "monitoramento",
                        principalTable: "formulario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_formulario_item_pergunta_pergunta_id",
                        column: x => x.pergunta_id,
                        principalSchema: "monitoramento",
                        principalTable: "pergunta",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "foto",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    uri = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    path = table.Column<string>(type: "text", nullable: true),
                    formulario_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_foto", x => x.id);
                    table.ForeignKey(
                        name: "fk_foto_formulario_formulario_id",
                        column: x => x.formulario_id,
                        principalSchema: "monitoramento",
                        principalTable: "formulario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "historico_formulario_item_alternativa",
                schema: "historico",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    alternativa_id = table.Column<Guid>(type: "uuid", nullable: false),
                    alternativa_nome = table.Column<string>(type: "text", nullable: true),
                    historico_formulario_item_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_historico_formulario_item_alternativa", x => x.id);
                    table.ForeignKey(
                        name: "fk_historico_formulario_item_alternativa_historico_formulario_~",
                        column: x => x.historico_formulario_item_id,
                        principalSchema: "historico",
                        principalTable: "historico_formulario_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "formulario_item_alternativa",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    alternativa_id = table.Column<Guid>(type: "uuid", nullable: false),
                    formulario_item_id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_sync = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_formulario_item_alternativa", x => x.id);
                    table.ForeignKey(
                        name: "fk_formulario_item_alternativa_alternativa_alternativa_id",
                        column: x => x.alternativa_id,
                        principalSchema: "monitoramento",
                        principalTable: "alternativa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_formulario_item_alternativa_formulario_item_formulario_item~",
                        column: x => x.formulario_item_id,
                        principalSchema: "monitoramento",
                        principalTable: "formulario_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_alternativa_pergunta_id",
                schema: "monitoramento",
                table: "alternativa",
                column: "pergunta_id");

            migrationBuilder.CreateIndex(
                name: "ix_aspnetroleclaims_role_id",
                table: "aspnetroleclaims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "role_name_index",
                table: "aspnetroles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_aspnetuserclaims_user_id",
                table: "aspnetuserclaims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_aspnetuserlogins_user_id",
                table: "aspnetuserlogins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_aspnetuserroles_role_id",
                table: "aspnetuserroles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "email_index",
                table: "aspnetusers",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "user_name_index",
                table: "aspnetusers",
                column: "normalized_user_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_formulario_localizacao_id",
                schema: "monitoramento",
                table: "formulario",
                column: "localizacao_id");

            migrationBuilder.CreateIndex(
                name: "ix_formulario_item_formulario_id",
                schema: "monitoramento",
                table: "formulario_item",
                column: "formulario_id");

            migrationBuilder.CreateIndex(
                name: "ix_formulario_item_pergunta_id",
                schema: "monitoramento",
                table: "formulario_item",
                column: "pergunta_id");

            migrationBuilder.CreateIndex(
                name: "ix_formulario_item_alternativa_alternativa_id",
                schema: "monitoramento",
                table: "formulario_item_alternativa",
                column: "alternativa_id");

            migrationBuilder.CreateIndex(
                name: "ix_formulario_item_alternativa_formulario_item_id",
                schema: "monitoramento",
                table: "formulario_item_alternativa",
                column: "formulario_item_id");

            migrationBuilder.CreateIndex(
                name: "ix_foto_formulario_id",
                schema: "monitoramento",
                table: "foto",
                column: "formulario_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_formulario_item_historico_localizacao_id",
                schema: "historico",
                table: "historico_formulario_item",
                column: "historico_localizacao_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_formulario_item_localizacao_id",
                schema: "historico",
                table: "historico_formulario_item",
                column: "localizacao_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_formulario_item_alternativa_historico_formulario_~",
                schema: "historico",
                table: "historico_formulario_item_alternativa",
                column: "historico_formulario_item_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_foto_historico_localizacao_id",
                schema: "historico",
                table: "historico_foto",
                column: "historico_localizacao_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_foto_localizacao_id",
                schema: "historico",
                table: "historico_foto",
                column: "localizacao_id");

            migrationBuilder.CreateIndex(
                name: "ix_localizacao_talhao_id",
                schema: "monitoramento",
                table: "localizacao",
                column: "talhao_id");

            migrationBuilder.CreateIndex(
                name: "ix_ocorrencia_ocorrencia_categoria_id",
                schema: "monitoramento",
                table: "ocorrencia",
                column: "ocorrencia_categoria_id");

            migrationBuilder.CreateIndex(
                name: "ix_pergunta_ocorrencia_id",
                schema: "monitoramento",
                table: "pergunta",
                column: "ocorrencia_id");

            migrationBuilder.CreateIndex(
                name: "ix_talhao_fazenda_id",
                schema: "monitoramento",
                table: "talhao",
                column: "fazenda_id");

            migrationBuilder.CreateIndex(
                name: "ix_usuario_fazenda_fazenda_id",
                schema: "monitoramento",
                table: "usuario_fazenda",
                column: "fazenda_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "aspnetroleclaims");

            migrationBuilder.DropTable(
                name: "aspnetuserclaims");

            migrationBuilder.DropTable(
                name: "aspnetuserlogins");

            migrationBuilder.DropTable(
                name: "aspnetuserroles");

            migrationBuilder.DropTable(
                name: "aspnetusertokens");

            migrationBuilder.DropTable(
                name: "cultura",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "formulario_item_alternativa",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "foto",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "historico_formulario_item_alternativa",
                schema: "historico");

            migrationBuilder.DropTable(
                name: "historico_foto",
                schema: "historico");

            migrationBuilder.DropTable(
                name: "usuario_fazenda",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "aspnetroles");

            migrationBuilder.DropTable(
                name: "aspnetusers");

            migrationBuilder.DropTable(
                name: "alternativa",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "formulario_item",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "historico_formulario_item",
                schema: "historico");

            migrationBuilder.DropTable(
                name: "formulario",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "pergunta",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "historico_localizacao",
                schema: "historico");

            migrationBuilder.DropTable(
                name: "localizacao",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "ocorrencia",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "talhao",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "ocorrencia_categoria",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "fazenda",
                schema: "monitoramento");
        }
    }
}
