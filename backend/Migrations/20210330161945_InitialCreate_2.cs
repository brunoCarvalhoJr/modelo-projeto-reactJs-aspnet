using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace backend.Migrations
{
    public partial class InitialCreate_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "numero",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                schema: "monitoramento",
                table: "talhao",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "area",
                schema: "monitoramento",
                table: "talhao",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                schema: "monitoramento",
                table: "talhao",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "fazenda_id",
                schema: "monitoramento",
                table: "talhao",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "fazenda",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    numero = table.Column<string>(type: "text", nullable: true),
                    area = table.Column<double>(type: "double precision", nullable: false),
                    the_geom = table.Column<Geometry>(type: "geometry", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_fazenda", x => x.id);
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
                    talhao_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "ocorrencia_categoria",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    ordem = table.Column<int>(type: "integer", nullable: false),
                    icone = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_ocorrencia_categoria", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "formulario",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    localizacao_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "ocorrencia",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    ocorrencia_categoria_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "foto",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    uri = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    path = table.Column<string>(type: "text", nullable: true),
                    formulario_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "pergunta",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tipo = table.Column<string>(type: "text", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    obrigatorio = table.Column<bool>(type: "boolean", nullable: false),
                    ocorrencia_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "alternativa",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: true),
                    pergunta_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                    pergunta_id = table.Column<Guid>(type: "uuid", nullable: false),
                    formulario_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "formulario_item_alternativa",
                schema: "monitoramento",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    alternativa_id = table.Column<Guid>(type: "uuid", nullable: false),
                    formulario_item_id = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "ix_talhao_fazenda_id",
                schema: "monitoramento",
                table: "talhao",
                column: "fazenda_id");

            migrationBuilder.CreateIndex(
                name: "ix_alternativa_pergunta_id",
                schema: "monitoramento",
                table: "alternativa",
                column: "pergunta_id");

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

            migrationBuilder.AddForeignKey(
                name: "fk_talhao_fazenda_fazenda_id",
                schema: "monitoramento",
                table: "talhao",
                column: "fazenda_id",
                principalSchema: "monitoramento",
                principalTable: "fazenda",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_talhao_fazenda_fazenda_id",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.DropTable(
                name: "fazenda",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "formulario_item_alternativa",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "foto",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "alternativa",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "formulario_item",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "formulario",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "pergunta",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "localizacao",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "ocorrencia",
                schema: "monitoramento");

            migrationBuilder.DropTable(
                name: "ocorrencia_categoria",
                schema: "monitoramento");

            migrationBuilder.DropIndex(
                name: "ix_talhao_fazenda_id",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.DropColumn(
                name: "area",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.DropColumn(
                name: "codigo",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.DropColumn(
                name: "fazenda_id",
                schema: "monitoramento",
                table: "talhao");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                schema: "monitoramento",
                table: "talhao",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "numero",
                schema: "monitoramento",
                table: "talhao",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);
        }
    }
}
