﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Data;

namespace backend.Migrations
{
    [DbContext(typeof(AgroContext))]
    partial class AgroContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("text")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text")
                        .HasColumnName("claim_value");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.HasKey("Id")
                        .HasName("pk_aspnetroleclaims");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_aspnetroleclaims_role_id");

                    b.ToTable("aspnetroleclaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("text")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text")
                        .HasColumnName("claim_value");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_aspnetuserclaims");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_aspnetuserclaims_user_id");

                    b.ToTable("aspnetuserclaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text")
                        .HasColumnName("login_provider");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text")
                        .HasColumnName("provider_key");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text")
                        .HasColumnName("provider_display_name");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("LoginProvider", "ProviderKey")
                        .HasName("pk_aspnetuserlogins");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_aspnetuserlogins_user_id");

                    b.ToTable("aspnetuserlogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.HasKey("UserId", "RoleId")
                        .HasName("pk_aspnetuserroles");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_aspnetuserroles_role_id");

                    b.ToTable("aspnetuserroles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text")
                        .HasColumnName("login_provider");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Value")
                        .HasColumnType("text")
                        .HasColumnName("value");

                    b.HasKey("UserId", "LoginProvider", "Name")
                        .HasName("pk_aspnetusertokens");

                    b.ToTable("aspnetusertokens");
                });

            modelBuilder.Entity("Models.Perfil", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("name");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("normalized_name");

                    b.HasKey("Id")
                        .HasName("pk_aspnetroles");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("role_name_index");

                    b.ToTable("aspnetroles");
                });

            modelBuilder.Entity("Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer")
                        .HasColumnName("access_failed_count");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("CpjCnpj")
                        .HasMaxLength(14)
                        .HasColumnType("character varying(14)")
                        .HasColumnName("cpj_cnpj");

                    b.Property<bool>("Desativado")
                        .HasColumnType("boolean")
                        .HasColumnName("desativado");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("email");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean")
                        .HasColumnName("email_confirmed");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean")
                        .HasColumnName("lockout_enabled");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("lockout_end");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("nome");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("normalized_email");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("normalized_user_name");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text")
                        .HasColumnName("password_hash");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text")
                        .HasColumnName("phone_number");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean")
                        .HasColumnName("phone_number_confirmed");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text")
                        .HasColumnName("security_stamp");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean")
                        .HasColumnName("two_factor_enabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("user_name");

                    b.HasKey("Id")
                        .HasName("pk_aspnetusers");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("email_index");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("user_name_index");

                    b.ToTable("aspnetusers");
                });

            modelBuilder.Entity("backend.Models.Alternativa", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<Guid>("PerguntaId")
                        .HasColumnType("uuid")
                        .HasColumnName("pergunta_id");

                    b.HasKey("Id")
                        .HasName("pk_alternativa");

                    b.HasIndex("PerguntaId")
                        .HasDatabaseName("ix_alternativa_pergunta_id");

                    b.ToTable("alternativa", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Fazenda", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<double>("Area")
                        .HasColumnType("double precision")
                        .HasColumnName("area");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<string>("Numero")
                        .HasColumnType("text")
                        .HasColumnName("numero");

                    b.Property<Geometry>("TheGeom")
                        .HasColumnType("geometry")
                        .HasColumnName("the_geom");

                    b.HasKey("Id")
                        .HasName("pk_fazenda");

                    b.ToTable("fazenda", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Formulario", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("LocalizacaoId")
                        .HasColumnType("uuid")
                        .HasColumnName("localizacao_id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.HasKey("Id")
                        .HasName("pk_formulario");

                    b.HasIndex("LocalizacaoId")
                        .HasDatabaseName("ix_formulario_localizacao_id");

                    b.ToTable("formulario", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.FormularioItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("FormularioId")
                        .HasColumnType("uuid")
                        .HasColumnName("formulario_id");

                    b.Property<Guid>("PerguntaId")
                        .HasColumnType("uuid")
                        .HasColumnName("pergunta_id");

                    b.Property<string>("Valor")
                        .HasColumnType("text")
                        .HasColumnName("valor");

                    b.HasKey("Id")
                        .HasName("pk_formulario_item");

                    b.HasIndex("FormularioId")
                        .HasDatabaseName("ix_formulario_item_formulario_id");

                    b.HasIndex("PerguntaId")
                        .HasDatabaseName("ix_formulario_item_pergunta_id");

                    b.ToTable("formulario_item", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.FormularioItemAlternativa", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("AlternativaId")
                        .HasColumnType("uuid")
                        .HasColumnName("alternativa_id");

                    b.Property<Guid>("FormularioItemId")
                        .HasColumnType("uuid")
                        .HasColumnName("formulario_item_id");

                    b.HasKey("Id")
                        .HasName("pk_formulario_item_alternativa");

                    b.HasIndex("AlternativaId")
                        .HasDatabaseName("ix_formulario_item_alternativa_alternativa_id");

                    b.HasIndex("FormularioItemId")
                        .HasDatabaseName("ix_formulario_item_alternativa_formulario_item_id");

                    b.ToTable("formulario_item_alternativa", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Foto", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("FormularioId")
                        .HasColumnType("uuid")
                        .HasColumnName("formulario_id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<string>("Path")
                        .HasColumnType("text")
                        .HasColumnName("path");

                    b.Property<string>("Uri")
                        .HasColumnType("text")
                        .HasColumnName("uri");

                    b.HasKey("Id")
                        .HasName("pk_foto");

                    b.HasIndex("FormularioId")
                        .HasDatabaseName("ix_foto_formulario_id");

                    b.ToTable("foto", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Localizacao", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Status")
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<Guid>("TalhaoId")
                        .HasColumnType("uuid")
                        .HasColumnName("talhao_id");

                    b.Property<Geometry>("TheGeom")
                        .HasColumnType("geometry")
                        .HasColumnName("the_geom");

                    b.Property<string>("Tipo")
                        .HasColumnType("text")
                        .HasColumnName("tipo");

                    b.HasKey("Id")
                        .HasName("pk_localizacao");

                    b.HasIndex("TalhaoId")
                        .HasDatabaseName("ix_localizacao_talhao_id");

                    b.ToTable("localizacao", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Ocorrencia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<Guid>("OcorrenciaCategoriaId")
                        .HasColumnType("uuid")
                        .HasColumnName("ocorrencia_categoria_id");

                    b.HasKey("Id")
                        .HasName("pk_ocorrencia");

                    b.HasIndex("OcorrenciaCategoriaId")
                        .HasDatabaseName("ix_ocorrencia_ocorrencia_categoria_id");

                    b.ToTable("ocorrencia", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.OcorrenciaCategoria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Icone")
                        .HasColumnType("text")
                        .HasColumnName("icone");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<int>("Ordem")
                        .HasColumnType("integer")
                        .HasColumnName("ordem");

                    b.Property<string>("Tipo")
                        .HasColumnType("text")
                        .HasColumnName("tipo");

                    b.HasKey("Id")
                        .HasName("pk_ocorrencia_categoria");

                    b.ToTable("ocorrencia_categoria", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Pergunta", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<bool>("Obrigatorio")
                        .HasColumnType("boolean")
                        .HasColumnName("obrigatorio");

                    b.Property<Guid>("OcorrenciaId")
                        .HasColumnType("uuid")
                        .HasColumnName("ocorrencia_id");

                    b.Property<string>("Tipo")
                        .HasColumnType("text")
                        .HasColumnName("tipo");

                    b.HasKey("Id")
                        .HasName("pk_pergunta");

                    b.HasIndex("OcorrenciaId")
                        .HasDatabaseName("ix_pergunta_ocorrencia_id");

                    b.ToTable("pergunta", "monitoramento");
                });

            modelBuilder.Entity("backend.Models.Talhao", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<float>("Area")
                        .HasColumnType("real")
                        .HasColumnName("area");

                    b.Property<string>("Codigo")
                        .HasColumnType("text")
                        .HasColumnName("codigo");

                    b.Property<Guid>("FazendaId")
                        .HasColumnType("uuid")
                        .HasColumnName("fazenda_id");

                    b.Property<string>("Nome")
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<Geometry>("TheGeom")
                        .HasColumnType("geometry")
                        .HasColumnName("the_geom");

                    b.HasKey("Id")
                        .HasName("pk_talhao");

                    b.HasIndex("FazendaId")
                        .HasDatabaseName("ix_talhao_fazenda_id");

                    b.ToTable("talhao", "monitoramento");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Models.Perfil", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("fk_aspnetroleclaims_asp_net_roles_role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_aspnetuserclaims_asp_net_users_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_aspnetuserlogins_asp_net_users_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Models.Perfil", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("fk_aspnetuserroles_asp_net_roles_role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_aspnetuserroles_asp_net_users_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_aspnetusertokens_asp_net_users_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Alternativa", b =>
                {
                    b.HasOne("backend.Models.Pergunta", "Pergunta")
                        .WithMany("Alternativas")
                        .HasForeignKey("PerguntaId")
                        .HasConstraintName("fk_alternativa_pergunta_pergunta_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pergunta");
                });

            modelBuilder.Entity("backend.Models.Formulario", b =>
                {
                    b.HasOne("backend.Models.Localizacao", "Localizacao")
                        .WithMany("Formularios")
                        .HasForeignKey("LocalizacaoId")
                        .HasConstraintName("fk_formulario_localizacao_localizacao_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Localizacao");
                });

            modelBuilder.Entity("backend.Models.FormularioItem", b =>
                {
                    b.HasOne("backend.Models.Formulario", "Formulario")
                        .WithMany("Itens")
                        .HasForeignKey("FormularioId")
                        .HasConstraintName("fk_formulario_item_formulario_formulario_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Pergunta", "Pergunta")
                        .WithMany()
                        .HasForeignKey("PerguntaId")
                        .HasConstraintName("fk_formulario_item_pergunta_pergunta_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Formulario");

                    b.Navigation("Pergunta");
                });

            modelBuilder.Entity("backend.Models.FormularioItemAlternativa", b =>
                {
                    b.HasOne("backend.Models.Alternativa", "Alternativa")
                        .WithMany()
                        .HasForeignKey("AlternativaId")
                        .HasConstraintName("fk_formulario_item_alternativa_alternativa_alternativa_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.FormularioItem", "FormularioItem")
                        .WithMany("Alternativas")
                        .HasForeignKey("FormularioItemId")
                        .HasConstraintName("fk_formulario_item_alternativa_formulario_item_formulario_item~")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Alternativa");

                    b.Navigation("FormularioItem");
                });

            modelBuilder.Entity("backend.Models.Foto", b =>
                {
                    b.HasOne("backend.Models.Formulario", "Formulario")
                        .WithMany("Fotos")
                        .HasForeignKey("FormularioId")
                        .HasConstraintName("fk_foto_formulario_formulario_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Formulario");
                });

            modelBuilder.Entity("backend.Models.Localizacao", b =>
                {
                    b.HasOne("backend.Models.Talhao", "Talhao")
                        .WithMany("Localizacoes")
                        .HasForeignKey("TalhaoId")
                        .HasConstraintName("fk_localizacao_talhao_talhao_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Talhao");
                });

            modelBuilder.Entity("backend.Models.Ocorrencia", b =>
                {
                    b.HasOne("backend.Models.OcorrenciaCategoria", "OcorrenciaCategoria")
                        .WithMany("Ocorrencias")
                        .HasForeignKey("OcorrenciaCategoriaId")
                        .HasConstraintName("fk_ocorrencia_ocorrencia_categoria_ocorrencia_categoria_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OcorrenciaCategoria");
                });

            modelBuilder.Entity("backend.Models.Pergunta", b =>
                {
                    b.HasOne("backend.Models.Ocorrencia", "Ocorrencia")
                        .WithMany("Perguntas")
                        .HasForeignKey("OcorrenciaId")
                        .HasConstraintName("fk_pergunta_ocorrencia_ocorrencia_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ocorrencia");
                });

            modelBuilder.Entity("backend.Models.Talhao", b =>
                {
                    b.HasOne("backend.Models.Fazenda", "Fazenda")
                        .WithMany("Talhoes")
                        .HasForeignKey("FazendaId")
                        .HasConstraintName("fk_talhao_fazenda_fazenda_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Fazenda");
                });

            modelBuilder.Entity("backend.Models.Fazenda", b =>
                {
                    b.Navigation("Talhoes");
                });

            modelBuilder.Entity("backend.Models.Formulario", b =>
                {
                    b.Navigation("Fotos");

                    b.Navigation("Itens");
                });

            modelBuilder.Entity("backend.Models.FormularioItem", b =>
                {
                    b.Navigation("Alternativas");
                });

            modelBuilder.Entity("backend.Models.Localizacao", b =>
                {
                    b.Navigation("Formularios");
                });

            modelBuilder.Entity("backend.Models.Ocorrencia", b =>
                {
                    b.Navigation("Perguntas");
                });

            modelBuilder.Entity("backend.Models.OcorrenciaCategoria", b =>
                {
                    b.Navigation("Ocorrencias");
                });

            modelBuilder.Entity("backend.Models.Pergunta", b =>
                {
                    b.Navigation("Alternativas");
                });

            modelBuilder.Entity("backend.Models.Talhao", b =>
                {
                    b.Navigation("Localizacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
